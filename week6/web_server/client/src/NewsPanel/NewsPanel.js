import './NewsPanel.css';
import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import _ from 'lodash';
import Auth from '../Auth/Auth';
class NewsPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      news:null,
      loading:false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.loadMoreNews();
    this.loadMoreNews = _.debounce(this.loadMoreNews, 500);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll(){
		let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
		if(((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50))){
			console.log("Loading more news...");
			this.loadMoreNews();
      this.setState({ loading: true });
		}
	}

  loadMoreNews() {

    let request = new Request('http://localhost:3000/news', {
      method: 'GET',
      headers: {
        "Authorization": 'bearer ' + Auth.getToken()
      },
      cache: 'no-cache'
    });

    fetch(request)
      .then(res => res.json())
      .then(news => {
        this.setState({
          news: this.state.news? this.state.news.concat(news) : news,
          loading: false
        });
      });
  }

  renderNews() {
    const news_list = this.state.news.map(function(news) {
      return(
        <a className='list-group-item' key={news.digest} href="#">
          <NewsCard news={news} />
        </a>
      );
    });

    return(
      <div className='container-fluid change-margin'>
        <div className='list-group'>
          {news_list}
        </div>
      </div>
    )
  }

  render() {
    let loading = this.state.loading;
    if (this.state.news) {
      return(
        <div>
          <div>
            {this.renderNews()}
          </div>
          {loading ?
            <div className="loading">
              <div className="preloader-wrapper small active ">
                <div className="spinner-layer spinner-green-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div></div>}

        </div>
      );
    } else {
      return(
        <div>
          <div id='msg-app-loading'>
            Loading...
          </div>
        </div>
      );
    }
  }
}

export default NewsPanel;
