import React from 'react';
import './style.less';

class Home extends React.Component {

    render() {
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

    render() {
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

    render() {
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


class MyResume extends React.Component {

    render() {
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

class AboutMe extends React.Component {

    state = {
        path: '/about/resume'
    }

    gotoPage = (path) => {

        this.setState({
            path
        });
    }



    render() {


        const path = this.state.path;

        let PageComponent;

        if (path.startsWith('/about/video')) {
            PageComponent = MyVideo;
        } else if (path.startsWith('/about/picture')) {
            PageComponent = MyPicture;
        } else if (path.startsWith('/about/resume')) {
            PageComponent = MyResume;
        } else {
            PageComponent = MyResume;
        }

        return <div className="about-me-wrap">
            <h2>关于我</h2>
            <div className="container">
                <div className="side">

                    <ul>
                        <li onClick={() => this.gotoPage('/about/video')} >我的视频</li>
                        <li onClick={() => this.gotoPage('/about/picture')} >我的照片</li>
                        <li onClick={() => this.gotoPage('/about/resume')} >我的简历</li>
                    </ul>


                </div>
                <div className="main">
                    <PageComponent />
                </div>
            </div>
        </div>;
    }
}

class OtherPage extends React.Component {

    render() {
        return <div>
            <h2>其他页面</h2>
            <div>
                <p>other撒打算大...</p>
                <p>撒打算...</p>
                <p>啊是的撒...</p>
            </div>
        </div>;
    }
}


class App extends React.Component {

    state = {
        path: '/about'
    }

    gotoPage = (path) => {

        this.setState({
            path
        });
    }


    render() {


        const path = this.state.path;

        let PageComponent;

        if (path.startsWith('/index')) {
            PageComponent = Home;
        } else if (path.startsWith('/about')) {
            PageComponent = AboutMe;
        } else if (path.startsWith('/other')) {
            PageComponent = OtherPage;
        } else {
            PageComponent = Home;
        }


        return (
            <div className="app-wrap">
                <ul className="nav-header">
                    <li onClick={() => this.gotoPage('/index')} >首页</li>
                    <li onClick={() => this.gotoPage('/about')} >关于我</li>
                    <li onClick={() => this.gotoPage('/other')} >其他页面</li>
                </ul>
                <div className="app-main"><PageComponent /></div>

            </div>
        );
    }
}


export default App;
//   ReactDOM.render(<App />,  document.getElementById('container'));