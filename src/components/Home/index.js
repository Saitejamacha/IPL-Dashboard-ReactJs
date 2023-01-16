import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {allTeams: [], isLoading: true}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    // console.log(data.teams)

    const updatedTeams = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    // console.log(updatedTeams)
    this.setState({allTeams: updatedTeams, isLoading: false})
  }

  render() {
    const {allTeams, isLoading} = this.state

    return isLoading ? (
      <div>
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className="main-con">
        <div className="top-con">
          <img
            className="logo"
            alt="ipl logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          />
          <h1>IPL Dashboard</h1>
        </div>
        <ul className="bg-con">
          {allTeams.map(eachTeam => (
            <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
