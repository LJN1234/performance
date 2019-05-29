import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/pages/user/Login';
import Home from '@/pages/home/Home';
import PerformanceList from '@/pages/home/PerformanceList';
import Audit from '@/pages/audit/Audit';
import ReviewList from '@/pages/audit/ReviewList';
import PerformanceDetails from '@/pages/audit/PerformanceDetails';
import User from '@/pages/user/User';
import PersonalInfo from '@/pages/user/PersonalInfo';
import RetrievePass from '@/pages/user/RetrievePass';


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                isLogin: false
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                isLogin: true
            },
            children: [
                {
                    path: 'performanceList',
                    name: 'performanceList',
                    component: PerformanceList,
                    meta: {
                        isLogin: true
                    },
                },
            ]
        },
        {
            path: '/audit',
            name: 'audit',
            component: Audit,
            meta: {
                isLogin: true
            },
            children: [
                {
                    path: 'reviewList',
                    name: 'reviewList',
                    component: ReviewList,
                    meta: {
                        isLogin: true
                    },
                },
                {
                    path: 'performanceDetails',
                    name: 'performanceDetails',
                    component: PerformanceDetails,
                    meta: {
                        isLogin: true
                    },
                }
            ]
        },
        {
            path: '/user',
            name: 'user',
            component: User,
            meta: {
                isLogin: true
            },
            children: [
                {
                    path: '/',
                    redirect: '/user/personalInfo'
                },
                {
                    path: 'personalInfo',
                    name: 'personalInfo',
                    component: PersonalInfo,
                    meta: {
                        isLogin: true
                    }
                },
                {
                    path: 'retrievePass',
                    name: 'retrievePass',
                    component: RetrievePass,
                    meta: {
                        isLogin: true
                    },
                }
            ]
        },
        {
            path: '/retrievePass',
            name: 'retrievePass',
            component: RetrievePass,
            meta: {
                isLogin: false
            }
        }
    ]
})
