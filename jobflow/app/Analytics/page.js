'use client'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { FiCalendar, FiCheck, FiClock, FiActivity, FiBriefcase, FiAward, FiFilter } from 'react-icons/fi'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import confetti from 'canvas-confetti'


ChartJS.register(ArcElement, Tooltip, Legend)


const motivationalQuotes = [
  "Every application brings you closer to your dream job",
  "Persistence is the key to success in your job search",
  "Your perfect opportunity is out there - keep going!",
  "Each 'no' brings you closer to that important 'yes'",
  "Stay consistent and the results will follow",
]


const timeFilters = [
  { label: 'Past 7 Days', value: 7 },
  { label: 'Past 30 Days', value: 30 },
  { label: 'All Time', value: 'all' }
]


const statusPriority = {
  'Accepted': 4,
  'Interview': 3,
  'Rejected': 2,
  'Applied': 1
}


const JobSearchInsights = () => {
  const router = useRouter()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [timeFilter, setTimeFilter] = useState('all')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authRes, jobsRes] = await Promise.all([
          fetch('/api/auth/check'),
          fetch('/api/jobs')
        ])
       
        const authData = await authRes.json()
        if (!authData.userId) return router.push('/login')
       
        const jobsData = await jobsRes.json()
       
        // Sort jobs by most recent activity with status priority
        const sortedJobs = jobsData.sort((a, b) => {
          // Get most recent activity date for each job
          const dateA = Math.max(
            new Date(a.updated_date || 0).getTime(),
            new Date(a.applied_date).getTime()
          )
          const dateB = Math.max(
            new Date(b.updated_date || 0).getTime(),
            new Date(b.applied_date).getTime()
          )
         
          // If dates are equal, sort by status priority
          if (dateB === dateA) {
            return statusPriority[b.status] - statusPriority[a.status]
          }
         
          // Otherwise sort by most recent date
          return dateB - dateA
        })
       
        setJobs(sortedJobs)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }


    fetchData()
  }, [router])


  // Filter jobs based on selected time range
  const filteredJobs = useMemo(() => {
    if (timeFilter === 'all') return jobs
   
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - timeFilter)
   
    return jobs.filter(job => {
      const appliedDate = new Date(job.applied_date)
      return appliedDate >= cutoffDate
    })
  }, [jobs, timeFilter])


  // Rotate motivational quotes
  useEffect(() => {
    if (filteredJobs.length === 0) return
   
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
    }, 8000)
   
    return () => clearInterval(interval)
  }, [filteredJobs.length])


  // Calculate metrics
  const { insights, latestUpdate } = useMemo(() => {
    const total = filteredJobs.length
    const statusCounts = {
      Applied: 0,
      Interview: 0,
      Rejected: 0,
      Accepted: 0
    }
   
    let daysSearching = 0
    let interviewStages = 0
   
    if (filteredJobs.length > 0) {
      const firstDate = new Date(Math.min(...filteredJobs.filter(j => j.applied_date).map(j => new Date(j.applied_date))))
      const today = new Date()
      daysSearching = Math.ceil((today - firstDate) / (1000 * 60 * 60 * 24))
     
      filteredJobs.forEach(job => {
        statusCounts[job.status]++
       
        if (job.status === 'Interview') {
          interviewStages++
        }
      })
    }
     
    let applicationsPerWeek = 0
    if (filteredJobs.length > 0) {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      applicationsPerWeek = filteredJobs.filter(job =>
        new Date(job.applied_date) >= oneWeekAgo
      ).length
    }
   
    const interviewRate = total > 0
      ? Math.min(Math.round((statusCounts.Interview / total) * 100), 100)
      : 0
     
    const offerRate = total > 0
      ? Math.min(Math.round((statusCounts.Accepted / total) * 100), 100)
      : 0
     
    const latestJob = filteredJobs[0] || null
    const latestStatus = latestJob?.status || null
    const latestIsAccepted = latestStatus === 'Accepted'
    const hasStatusUpdate = latestJob?.updated_date &&
                          latestJob.updated_date !== latestJob.applied_date
   
    return {
      insights: {
        totalApplications: total,
        daysSearching,
        applicationsPerWeek,
        interviewStages,
        interviewRate,
        offerRate,
        latestIsAccepted,
        hasStatusUpdate,
        statusCounts
      },
      latestUpdate: {
        job: latestJob,
        status: latestStatus,
        isNewUpdate: hasStatusUpdate,
        date: latestJob?.updated_date || latestJob?.applied_date
      }
    }
  }, [filteredJobs])


  const handleStatusClick = () => {
    if (insights.latestIsAccepted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }


  const formatAppliedDate = (dateString) => {
    const date = new Date(dateString)
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }


  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Analytics Dashboard</h1>
          {insights.latestIsAccepted ? (
            <p className="text-lg text-green-600">Congratulations on your offer! 🎉</p>
          ) : filteredJobs.length > 0 ? (
            <p className="text-lg text-indigo-600 animate-fadeIn">
              {motivationalQuotes[currentQuote]}
            </p>
          ) : (
            <p className="text-lg text-gray-600">Ready to start your job search journey?</p>
          )}
        </div>


        <div className="mb-6 flex justify-end">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
            <FiFilter className="text-gray-500" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-transparent border-none text-sm focus:ring-0"
            >
              {timeFilters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
       
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto max-w-md">
              <FiBriefcase className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No applications in this time period</h3>
              <p className="mt-1 text-gray-500">
                {timeFilter === 'all'
                  ? "Start adding job applications to see insights"
                  : `No applications in the past ${timeFilter} days`}
              </p>
              <button
                onClick={() => router.push('/jobs')}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add New Application
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <FiBriefcase className="h-6 w-6 text-indigo-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Total Applications</h3>
                    <p className="text-3xl font-bold">{insights.totalApplications}</p>
                    <p className="text-sm text-gray-500">
                      {timeFilter === 'all' ? 'All time' : `Past ${timeFilter} days`}
                    </p>
                  </div>
                </div>
              </div>
             
              <div
                className={`p-6 rounded-lg cursor-pointer ${insights.latestIsAccepted ? 'bg-green-50 hover:bg-green-100' : 'bg-white hover:bg-gray-50'} shadow-sm transition-colors`}
                onClick={handleStatusClick}
              >
                <div className="flex items-center">
                  {insights.latestIsAccepted ? (
                    <FiCheck className="h-6 w-6 text-green-500 mr-3" />
                  ) : latestUpdate.status === 'Interview' ? (
                    <FiActivity className="h-6 w-6 text-amber-500 mr-3" />
                  ) : (
                    <FiClock className="h-6 w-6 text-blue-500 mr-3" />
                  )}
                  <div
                  onClick={() => router.push('/jobs')}
                >
                    <h3 className="font-medium text-gray-900">Latest Update</h3>
                    <p className="text-xl">
                   
                      {latestUpdate.status === 'Applied' && `Applied to ${latestUpdate.job?.company || 'a company'}`}
                      {latestUpdate.status === 'Interview' && `Interview at ${latestUpdate.job?.company || 'a company'}`}
                      {latestUpdate.status === 'Rejected' && `Update from ${latestUpdate.job?.company || 'a company'}`}
                      {latestUpdate.status === 'Accepted' && `Offer from ${latestUpdate.job?.company || 'a company'} 🎉`}
                    </p>
                    {latestUpdate.date && (
                      <p className="text-sm text-gray-500">
                        {formatAppliedDate(latestUpdate.date)}
                        {latestUpdate.isNewUpdate && ' • Updated'}
                      </p>
                    )}
                  </div>
                 
                </div>
              </div>
             
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <FiActivity className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">Weekly Rate</h3>
                    <p className="text-3xl font-bold">{insights.applicationsPerWeek}</p>
                    <p className="text-sm text-gray-500">applications this week</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FiActivity className="mr-2" /> Application Status Breakdown
                </h2>
                <div className="h-64">
                  <Doughnut
                    data={{
                      labels: ['Applied', 'Interview', 'Rejected', 'Accepted'],
                      datasets: [{
                        data: [
                          insights.statusCounts.Applied,
                          insights.statusCounts.Interview,
                          insights.statusCounts.Rejected,
                          insights.statusCounts.Accepted
                        ],
                        backgroundColor: [
                          '#6366F1',
                          '#F59E0B',
                          '#EF4444',
                          '#10B981'
                        ],
                        borderWidth: 0
                      }]
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              </div>


              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FiAward className="mr-2" /> Performance Metrics
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Interview Rate</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${insights.interviewRate}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-sm text-gray-700 min-w-[40px] text-right">
                        {insights.interviewRate}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {insights.statusCounts.Interview} interviews / {insights.totalApplications} applications
                    </p>
                  </div>
                 
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Offer Rate</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${insights.offerRate}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-sm text-gray-700 min-w-[40px] text-right">
                        {insights.offerRate}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {insights.statusCounts.Accepted} offers / {insights.totalApplications} applications
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FiCalendar className="mr-2" /> Recent Applications
                </h2>
                <button
                  onClick={() => router.push('/jobs')}
                  className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  View All <span className="ml-1">→</span>
                </button>
              </div>
             
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredJobs.slice(0, 5).map(job => (
                      <tr
                        key={job.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => router.push('/jobs')}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{job.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-600">{job.position}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">
                            {formatAppliedDate(job.applied_date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                            job.status === 'Interview' ? 'bg-amber-100 text-amber-800' :
                            job.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


            {Object.values(insights.statusCounts).some(count => count > 0) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Optimization Strategy</h2>
               
                <div className="space-y-4">
                  {insights.applicationsPerWeek < 5 && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">📈 Increase Application Volume</h3>
                      <p className="text-blue-700">
                        You submitting about {insights.applicationsPerWeek} applications per week.
                        Research shows that candidates who apply to 5-10 relevant positions weekly
                        have significantly higher success rates.
                      </p>
                    </div>
                  )}
                 
                  {insights.interviewRate < 20 && (
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-medium text-purple-800 mb-2">✏️ Improve Application Materials</h3>
                      <p className="text-purple-700">
                        Your interview rate is {insights.interviewRate}%. Consider tailoring your resume
                        and cover letters more closely to each position's requirements.
                      </p>
                    </div>
                  )}
                 
                  {insights.latestIsAccepted && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-medium text-green-800 mb-2">🎉 Celebrate Your Success</h3>
                      <p className="text-green-700">
                        You've received an offer from {latestUpdate.job?.company || 'a company'}! Review what worked well
                        in your job search process to replicate this success in the future.
                      </p>
                    </div>
                  )}
                 
                  {!insights.latestIsAccepted && insights.statusCounts.Interview > 0 && (
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <h3 className="font-medium text-amber-800 mb-2">⏱️ Follow Up Strategically</h3>
                      <p className="text-amber-700">
                        Companies typically respond within 7-14 days.
                        A polite follow-up email after 1 week can keep your application top of mind.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}


export default JobSearchInsights
