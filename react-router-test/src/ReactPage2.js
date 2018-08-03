import React from 'react';
import './style.less';
import {
    HashRouter,
    Route,
    Link,
    Switch
  }   from 'react-router-dom';
  
  class Home extends React.Component {
    
    render(){
      return <div>
            <h2>首页</h2> 
            <div>
              <p>balabalbalbalbablablabal...</p>
              <p>balabalbalbalbablablabal...</p>
              <p>balabalbalbalbablablabal...</p>
            </div>
       </div>;
    }
  }
  
  
  class MyVideo extends React.Component {
    
    render(){
      return <div>
            <h2>我的视频</h2> 
            <div>
              <p>video1.avi...</p>
              <p>video2...</p>
              <p>video3...</p>
            </div>
       </div>;
    }
  }
  
  class MyPicture extends React.Component {
    
    render(){
      return <div>
            <h2>我的图片</h2> 
            <div>
              <p>.mmmabc.jpg..</p>
              <p>aabc.gif...</p>
              <p>def.png...</p>
            </div>
       </div>;
    }
  }
  class sql extends React.Component {
    
    render(){
      return <div>
            <h2>SQL规范</h2> 
            <div>
              <p>第一点</p>
              <p>第二点</p>
              <p>第三点</p>
            </div>
       </div>;
    }
  }
  class javaBase extends React.Component {
    
    render(){
      return <div>
            <h2>Java基础开发规范我的照片</h2> 
            <div>
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
       </div>;
    }
  }
  class javaEnd extends React.Component {
    
    render(){
      return <div>
            <h2>Java后端服务开发规范</h2> 
            <div>
              <p>java后端开发</p>
              <p>111111</p>
              <p>22222</p>
            </div>
       </div>;
    }
  }
  class restApi extends React.Component {
    
    render(){
      return <div>
            <h2>Rest api规范</h2> 
            <div>
              <p>天青色等烟雨</p>
              <p>炊烟缭缭升起</p>
              <p>雨纷纷旧故里草木深</p>
            </div>
       </div>;
    }
  }
  class frontService extends React.Component {
    
    render(){
      return <div>
            <h2>前端服务开发规范</h2> 
            <div>
              <p>天青色等烟雨</p>
              <p>炊烟缭缭升起</p>
              <p>雨纷纷旧故里草木深</p>
            </div>
       </div>;
    }
  }
    class gitCommit extends React.Component {
    
    render(){
      return <div>
            <h2>Git规范</h2> 
            <div>
              <p>天青色等烟雨</p>
              <p>炊烟缭缭升起</p>
              <p>雨纷纷旧故里草木深</p>
            </div>
       </div>;
    }
  }
    class gitLab extends React.Component {
    
    render(){
      return <div>
            <h2>GitLab CI</h2> 
            <div>
              <p>天青色等烟雨</p>
              <p>炊烟缭缭升起</p>
              <p>雨纷纷旧故里草木深</p>
            </div>
       </div>;
    }
  }
  class MyResume extends React.Component {
    
    render(){
      return <div>
            <h2>我的简历</h2> 
            <div>
              <p>技能：唱歌</p>
              <p>擅长：react，java，sql</p>
              <p>职业：前端工程师...</p>
            </div>
       </div>;
    }
  }
  
 

  
  class doctype extends React.Component{
    render(){
     return <div>
        <h2>这里是文档</h2>
        <div>
          <p>这里写入我的文档</p>
        </div>
      </div>
    }
  } 

  class App extends React.Component {
    
   render(){
      return (
          <HashRouter>
          
            <div className="app-wrap">
            {/* <img src="../imgs/choerodon_logo_fixed"></img> */}
            <h2>编码规范</h2>
              <ul className='left' >
                
                <li><Link to="/sql">SQL规范</Link></li>
                <li><Link to="/javaBase">Java基础开发规范</Link></li>
                <li><Link to="/javaEnd">Java后端服务开发规范</Link></li>
                <li><Link to="/restApi">Rest api规范</Link></li>
                <li><Link to="/frontService">前端服务开发规范</Link></li>
                <li><Link to="/gitCommit">Git提交规范我的简历</Link></li>
                <li><Link to="/gitLab">Gitlab CI</Link></li>
              </ul>
              <ul className="nav-header">
                <li><Link to="/index">首页</Link></li>
                <li><Link to="/doctype">文档</Link></li>
                {/* <li><Link to="/other">每日总结</Link></li> */}
              </ul>
              <div className="app-main">
                <Switch>
                  <Route path="/index" component={Home}/>
                  {/* <Route path="/about" component={AboutMe} /> */}
                  <Route path="/doctype" component={doctype}/>
                  <div className="main">
                    <Switch>
                     <Route path="/sql" component={sql}/>
                     <Route path="/javaBase" component={javaBase}/>
                     <Route path="/javaEnd" component={javaEnd}/>
                     <Route path="/restApi" component={restApi}/>
                     <Route path="/frontService" component={frontService}/>
                     <Route path="/gitCommit" component={gitCommit}/>
                     <Route path="/gitLab" component={gitLab}/>
                     <Route component={Home}/>
                    </Switch>
                  </div>
                </Switch>
              </div>
            </div>
        </HashRouter>
      );
   }
  }
  

export default App;
//   ReactDOM.render(<App />,  document.getElementById('container'));