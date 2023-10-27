import {
  BrowserRouter as Router,
  Route,
  Switch,
  //These imports are a result of installing npm React Router.
  // it allows for easy navigation between pages.
} from 'react-router-dom'

import Homepage from './Pages/Homepage'
import ArticlesListPage from './Pages/ArticlesListPage'
import ArticlePage from './Pages/ArticlePage'
import ReportIssuesPage from './Pages/ReportIssuesPage'
import ChatPage from './Pages/ChatPage'
import NotFoundPage from './Pages/NotFoundPage'
import NavBar from './NavBar'
import Footer from './Footer'
import './App.css'

import Layout from './reuseable-components/Layout'

//upon creation of the React template, React has some sample code that will showcase on the localhost
// so I deleted everything within the outermost div of the original template script

function App() {
  /*  The most obvious difference is the syntax. A functional component is just a plain JavaScript function 
      which accepts props as an argument and returns a React element.  
  */
  //Wrap entire app between router tags to initalise router import
  return (
    <>
      <NavBar />
      <Router>
        <Layout>
          <Switch>
            <Route path="/" component={Homepage} exact />
            <Route path="/articles-list" component={ArticlesListPage} />
            <Route path="/article/:name/:id" component={ArticlePage} />
            <Route path="/report-issues" component={ReportIssuesPage} />
            <Route path="/chat-forum/:room" component={ChatPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
        <Footer />
      </Router>
    </>
  )
}

export default App

/*
There is one major difference between these methods of defining a component. It's related to the state of the particular React component.

So, Function-Based Components => Are also called Stateless components reason being they don't update to any changes that are being applied to a particular component.

So, If I want to change some value in this <p>Hi, Welcome</p> on a button press to <p>Welcome Back</p> It wouldn't be possible to use function-based components.

On the other hand, Class-Based Components => Are also called Stateful Components, being that they update to changes that occur to the component.

So, the previous example would work.

Personally, I would say a simple way to remember is Functional Components for static data and Class-Based Components for dynamic and interactive data.

*/
