/**
 *  首页
 *
 * Created by xiaobaicai on 2017/7/18.
 */
'use strict';
import React from 'react';
import '../style/HomePage.scss';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getScrollHeight() {
        // 兼容不同浏览器 获取页面滚动高度
        //let top = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
        //Global.homePageTop = top;
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <div style={{height: '100%'}}>
            </div>
        )
    };

}
export default HomePage;
