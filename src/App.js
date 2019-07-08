import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

//App Components
import Gallery from './components/Gallery';
import Header from './components/Header';
import NotFound from './components/NotFound';
import apiKey from './config';

class App extends Component {

  constructor() {
    super();
    this.state = {
      imgs: [],
      cats:[],
      dogs: [],
      birds: [],
      title: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.search('cats')
    this.search('dogs')
    this.search('birds')
  }

  search = (query) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1&extras=url_z`)
      .then(res => res.json())
      .then(resData => {
        if (query === 'cats') {
          this.setState({
            cats: resData.photos.photo,
            isLoading: false
          });
        } else if (query === 'dogs') {
          this.setState({
            dogs: resData.photos.photo,
            isLoading: false
          });
        } else if (query === 'birds') {
          this.setState({
            birds: resData.photos.photo,
            isLoading: false
          });
        } else {
          this.setState({
            imgs: resData.photos.photo,
            title: 'results for ' + query,
            isLoading: false
          });
        }

      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <BrowserRouter>
      <div className="container">
        <Header onSearch={this.search}/>
        { /* Routes */ }
        <Switch>
        <Route exact path="/" render={ () => <Redirect to="/cats"/> }/>
        <Route path="/cats" render={ () => (this.state.isLoading) ? <p>Loading...</p> : <Gallery data={this.state.cats} title="results for cats"/> }/>
        <Route path="/dogs" render={ () => (this.state.isLoading) ? <p>Loading...</p> : <Gallery data={this.state.dogs} title="results for dogs"/> }/>
        <Route path="/birds" render={ () => (this.state.isLoading) ? <p>Loading...</p> : <Gallery data={this.state.birds} title="results for birds"/> }/>
        <Route path="/search-query/:title" render={ () => (this.state.isLoading) ? <p>Loading...</p> : <Gallery data={this.state.imgs} title={this.state.title}/> }/>
        <Route component={NotFound} />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
