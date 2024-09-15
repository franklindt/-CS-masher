import React, { useState } from "react"
import { Heart, X, ChevronDown, ChevronUp } from "lucide-react"
import axios from 'axios'


const users1 = [
  {
    leetcodeUsername: "Alice Johnson",
    fullName: "Alice Marie Johnson",
    age: 28,
    zodiacSign: "Libra",
    bio: "Software engineer by day, competitive coder by night. Looking for someone to debug my heart.",
    leetcodeQuestions: 250,
    leetcodeBreakdown: {
      easy: 100,
      medium: 100,
      hard: 50
    },
    wordsPerMinute: 75,
    image: "/placeholder.svg?height=400&width=300"
  },
  {
    leetcodeUsername: "Bob Smith",
    fullName: "Robert James Smith",
    age: 32,
    zodiacSign: "Taurus",
    bio: "Full-stack developer with a passion for AI and machine learning. Seeking a partner to build a lifelong project together.",
    leetcodeQuestions: 180,
    leetcodeBreakdown: {
      easy: 80,
      medium: 80,
      hard: 20
    },
    wordsPerMinute: 65,
    image: "/placeholder.svg?height=400&width=300"
  },
  {
    leetcodeUsername: "Charlie Brown",
    fullName: "Charles Brown Jr.",
    age: 25,
    zodiacSign: "Gemini",
    bio: "Aspiring tech entrepreneur and coding enthusiast. Looking for someone to share late-night coding sessions and pizza.",
    leetcodeQuestions: 320,
    leetcodeBreakdown: {
      easy: 120,
      medium: 150,
      hard: 50
    },
    wordsPerMinute: 80,
    image: "/placeholder.svg?height=400&width=300"
  }
]


console.log(users)

async function UserDetails({ user, onClose }) {
  return (
    <div className="bg-white p-4 rounded-b-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{user.fullName}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <ChevronDown size={24} />
        </button>
      </div>
      <p className="text-gray-600 mb-2">Age: {user.age} | Zodiac: {user.zodiacSign}</p>
      <p className="text-gray-700 mb-4">{user.bio}</p>
      <h4 className="font-semibold mb-2">LeetCode Breakdown:</h4>
      <div className="flex justify-between mb-4">
        <span className="text-green-500">Easy: {user.leetcodeBreakdown.easy}</span>
        <span className="text-yellow-500">Medium: {user.leetcodeBreakdown.medium}</span>
        <span className="text-red-500">Hard: {user.leetcodeBreakdown.hard}</span>
      </div>
    </div>
  )
}

export default function TinderLikeCard() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [users, setUsers] = useState([])
  
  const id = 5
  
  var config0 = {
    method: 'get',
    url: 'http://localhost:3001/feed/' + {id},
  }
  
  axios(config0).then((res) => {
    setUsers(res)
  }).catch((err) => {
    alert('Need more aura!!!!')
    console.log(err)
  })

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction} on ${users[currentUserIndex].leetcodeUsername}`)
    if (direction == "right") {
      var to = 7
      var config = {
        method: 'post',
        url: 'http://localhost:3001/match',
        data: {
          from: {id},
          to: {to}
        }
      }
      axios(config).then((res) => {
        alert("Skibidi RIZZ!")
      }).catch((err) => {
        alert("L aura")
        console.log(err);
      })
    }
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % users.length)
    setShowDetails(false)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const currentUser = users[currentUserIndex]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src='https://xsgames.co/randomusers/avatar.php?g=female'
              alt={currentUser.leetcodeUsername}
              className="w-full h-[400px] object-cover cursor-pointer"
              onClick={toggleDetails}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-2xl font-bold text-white">{currentUser.leetcodeUsername}</h2>
              <button 
                onClick={toggleDetails} 
                className="absolute bottom-4 right-4 text-white hover:text-gray-200"
                aria-label={showDetails ? "Hide details" : "Show details"}
              >
                {showDetails ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{currentUser.leetcodeQuestions}</span> LeetCode questions
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{currentUser.wordsPerMinute}</span> WPM
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSwipe('left')}
                className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors"
                aria-label="Dislike"
              >
                <X size={24} />
              </button>
              <button
                onClick={() => handleSwipe('right')}
                className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-colors"
                aria-label="Like"
              >
                <Heart size={24} />
              </button>
            </div>
          </div>
        </div>
        {showDetails && (
          <UserDetails user={currentUser} onClose={() => setShowDetails(false)} />
        )}
      </div>
    </div>
  )
}