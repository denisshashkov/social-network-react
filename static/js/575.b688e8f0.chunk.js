"use strict";(self.webpackChunksocial_network_react=self.webpackChunksocial_network_react||[]).push([[575],{4575:function(e,n,r){r.r(n),r.d(n,{default:function(){return Z}});var o=r(8683),t=r(3144),s=r(5671),a=r(136),u=r(3668),i=r(2791),l=r(885),c="pagination_pageNumber__yNlRq",g="pagination_selectedPage__Uy2Ul",d=r(184);var h=function(e){for(var n=e.totalItemCount,r=e.pageSize,o=e.currentPage,t=e.changePageHandler,s=e.portionSize,a=void 0===s?8:s,u=Math.ceil(n/r),h=[],f=1;f<=u;f++)h.push(f);var p=Math.ceil(u/a),C=(0,i.useState)(1),P=(0,l.Z)(C,2),x=P[0],j=P[1],k=(x-1)*a+1,w=x*a;return(0,d.jsxs)("div",{children:[x>1&&(0,d.jsx)("button",{onClick:function(){j(x-1)},children:"Prev"}),h.filter((function(e){return e>=k&&e<=w})).map((function(e){return(0,d.jsx)("span",{className:o===e?g:c,onClick:function(n){t(e)},children:e},e)})),p>x&&(0,d.jsx)("button",{onClick:function(){j(x+1)},children:"Next"})]})},f=r(3504),p=r(9392),C="users_user__photo__tO0vz";var P=function(e){var n=e.user,r=e.followThunkCreator,o=e.followingProgress,t=e.unFollowThunkCreator;return(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{children:(0,d.jsx)(f.OL,{to:"/profile/"+n.id,children:(0,d.jsx)("img",{className:C,src:null!=n.photos.large?n.photos.large:p,alt:""})})}),(0,d.jsx)("div",{children:n.followed?(0,d.jsx)("button",{disabled:o.includes(n.id),onClick:function(){t(n)},children:"Unfollow"}):(0,d.jsx)("button",{disabled:o.includes(n.id),onClick:function(){r(n)},children:"Follow"})}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h3",{children:n.name}),(0,d.jsx)("span",{children:n.status})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("span",{children:"user.location.country"}),(0,d.jsx)("span",{children:"user.location.city"})]})]})},x=function(e){return(0,d.jsxs)("div",{children:[(0,d.jsx)(h,{totalItemCount:e.totalUsersCount,pageSize:e.pageSize,currentPage:e.currentPage,changePageHandler:e.changePageHandler}),e.users.map((function(n){return(0,d.jsx)(P,{user:n,followThunkCreator:e.followThunkCreator,followingProgress:e.followingProgress,unFollowThunkCreator:e.unFollowThunkCreator},n.id)}))]})},j=r(7638),k=r(5083),w=r(7581),v=function(e){return e.usersPage.users},_=function(e){return e.usersPage.pageSize},m=function(e){return e.usersPage.followingProgress},b=function(e){return e.usersPage.isFetching},F=function(e){return e.usersPage.totalUsersCount},T=function(e){return e.usersPage.currentPage},U=function(e){(0,a.Z)(r,e);var n=(0,u.Z)(r);function r(){var e;(0,s.Z)(this,r);for(var t=arguments.length,a=new Array(t),u=0;u<t;u++)a[u]=arguments[u];return(e=n.call.apply(n,[this].concat(a))).componentDidMount=function(){var n=e.props,r=n.currentPage,o=n.pageSize;e.props.getUsersThunkCreator(r,o)},e.changePageHandler=function(n){var r=e.props.pageSize;e.props.getUsersThunkCreator(n,r)},e.render=function(){return(0,d.jsxs)(d.Fragment,{children:[e.props.isFetching?(0,d.jsx)(j.Z,{}):null,(0,d.jsx)(x,(0,o.Z)((0,o.Z)({},e.props),{},{changePageHandler:e.changePageHandler}))]})},e}return(0,t.Z)(r)}(i.Component),Z=(0,w.$j)((function(e){return{users:v(e),followingProgress:m(e),isFetching:b(e),pageSize:_(e),totalUsersCount:F(e),currentPage:T(e)}}),{follow:k.ZN,unFollow:k.IJ,getCurrentPage:k.FZ,disabledButton:k.O4,getUsersThunkCreator:k.Uk,unFollowThunkCreator:k.UD,followThunkCreator:k.AC})(U)},9392:function(e,n,r){e.exports=r.p+"static/media/user.d223269b140c6fd83582.png"}}]);
//# sourceMappingURL=575.b688e8f0.chunk.js.map