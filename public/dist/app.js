angular.module("userApp",["ngAnimate","app.routes","authService","userService","boxService","questionService","mainCtrl","userCtrl","boxCtrl","questionCtrl","ui.bootstrap"]).config(["$httpProvider",function(e){e.interceptors.push("AuthInterceptor")}]),angular.module("app.routes",["ngRoute"]).config(["$routeProvider","$locationProvider",function(e,t){e.when("/",{templateUrl:"app/views/pages/home.html"}).when("/login",{templateUrl:"app/views/pages/login.html",controller:"mainController",controllerAs:"login"}).when("/register",{templateUrl:"app/views/pages/register.html",controller:"userRegisterController",controllerAs:"register"}).when("/u/:username",{templateUrl:"app/views/pages/user/profile.html",controller:"userProfileController",controllerAs:"currentUser"}).when("/users",{templateUrl:"app/views/pages/users/all.html",controller:"userController",controllerAs:"user"}).when("/users/create",{templateUrl:"app/views/pages/users/single.html",controller:"userCreateController",controllerAs:"user"}).when("/users/:user_id",{templateUrl:"app/views/pages/users/single.html",controller:"userEditController",controllerAs:"user"}).when("/box/:box_id",{templateUrl:"app/views/pages/boxes/show.html",controller:"boxShowController",controllerAs:"showBox"}),t.html5Mode(!0)}]),angular.module("boxCtrl",["ui.bootstrap"]).controller("boxModalController",["$modal","Auth",function(e,t){var o=this;t.getUser().success(function(e){o.currentUser=e}),o.open=function(){e.open({templateUrl:"app/views/pages/boxes/new.html",controller:"boxCreateController",controllerAs:"box",resolve:{currentUser:function(){return o.currentUser},formType:function(){return"create"}}})}}]).controller("boxController",["Auth","Box","$scope","$modal",function(e,t,o,r){function n(){s.processing=!0,t.getByUsername(s.user.username).success(function(e){s.processing=!1,s.boxes=e})}var s=this;s.processing=!0,e.getUser().success(function(e){s.user=e,t.getByUsername(s.user.username).success(function(e){s.processing=!1,s.boxes=e})}),s.deleteBox=function(e){t["delete"](s.boxes[e]._id).success(function(e){n()})},s.editBox=function(e){s.type="edit";r.open({templateUrl:"app/views/pages/boxes/new.html",controller:"boxEditController",controllerAs:"box",resolve:{boxData:function(){return s.boxes[e]},formType:function(){return"edit"}}})},o.$on("new-box-created",function(e,t){console.log("msg is "+JSON.stringify(t,null," ")),n()})}]).controller("boxCreateController",["Box","$modalInstance","currentUser","formType","$rootScope",function(e,t,o,r,n){var s=this;s.boxData={},s.boxData.creator=o.username,s.type=r,s.createBox=function(){e.create(s.boxData).success(function(e){n.$broadcast("new-box-created",s.boxData),t.close()})},s.closeModal=function(){t.dismiss("cancel")}}]).controller("boxEditController",["Box","$modalInstance","boxData","formType","$rootScope",function(e,t,o,r,n){var s=this;s.boxData=o,s.type=r,s.createBox=function(){e.update(s.boxData._id,s.boxData).success(function(e){n.$broadcast("new-box-created",s.boxData),t.close()})},s.closeModal=function(){t.dismiss("cancel")}}]).controller("boxShowController",["Box","Question","Auth","$routeParams","$scope",function(e,t,o,r,n){function s(e){for(var t={},o=0;o<e.length;o++){var r=e[o]._id;e[o].voters.map(function(e){e.voter==a.currentUser.username&&(e.upvote===!0&&(t[r]="upvote"),e.downvote===!0&&(t[r]="downvote"))})}return t}var u,a=this;a.box={},a.box.questions=[],o.getUser().success(function(e){a.currentUser=e}),e.getById(r.box_id).success(function(e){a.box=e}),t.getForBox(r.box_id).success(function(e){a.box.questions=e,u=s(a.box.questions)}),a.isUpvoted=function(e){return"upvote"===u[e]?!0:void 0},a.isDownvoted=function(e){return"downvote"===u[e]?!0:void 0},n.$on("new-question-created",function(e,t){a.box.questions.push(t)})}]),angular.module("mainCtrl",[]).controller("mainController",["$rootScope","$location","Auth",function(e,t,o){var r=this;r.loggedIn=o.isLoggedIn(),e.$on("$routeChangeStart",function(){r.loggedIn=o.isLoggedIn(),o.getUser().then(function(e){r.user=e.data})}),r.doLogin=function(){r.processing=!0,o.login(r.loginData.username,r.loginData.password).success(function(e){r.processing=!1,e.success?t.path("/users"):r.error=e.message})},r.doLogout=function(){o.logout(),r.user={},t.path("/login")},r.goToProfile=function(){t.path("/u/"+r.user.username)}}]),angular.module("questionCtrl",[]).controller("questionCreateController",["Auth","Question","$routeParams","$rootScope",function(e,t,o,r){var n=this;n.questionData={},n.questionData.box_id=o.box_id,e.getUser().success(function(e){n.questionData.creator=e.username}),n.createQuestion=function(){n.processing=!0,t.create(n.questionData).success(function(e){n.processing=!1,r.$broadcast("new-question-created",e.question),n.questionData.content=""})}}]).controller("questionVoteController",["Auth","Question",function(e,t){var o=this;o.voteData={},e.getUser().success(function(e){o.currentUser=e}),o.upvote=function(e){o.voteData.voter=o.currentUser.username,o.voteData.upvote=!0,o.voteData.downvote=!1,t.vote(e._id,o.voteData).success(function(e){console.log(e.message)})},o.downvote=function(e){o.voteData.voter=o.currentUser.username,o.voteData.upvote=!1,o.voteData.downvote=!0,t.vote(e._id,o.voteData).success(function(e){console.log(e.message)})}}]),angular.module("userCtrl",["userService"]).controller("userController",["User",function(e){var t=this;t.processing=!0,e.all().success(function(e){t.processing=!1,t.users=e}),t.deleteUser=function(o){t.processing=!0,e["delete"](o).success(function(o){e.all().success(function(e){t.processing=!1,t.users=e})})}}]).controller("userCreateController",["User",function(e){var t=this;t.type="create",t.saveUser=function(){t.processing=!0,t.message="",e.create(t.userData).success(function(e){t.processing=!1,t.userData={},t.message=e.message})}}]).controller("userEditController",["$routeParams","User",function(e,t){var o=this;o.type="edit",t.get(e.user_id).success(function(e){o.userData=e}),o.saveUser=function(){o.processing=!0,o.message="",t.update(e.user_id,o.userData).success(function(e){o.processing=!1,o.userData={},o.message=e.message})}}]).controller("userRegisterController",["User","Auth","$location",function(e,t,o){var r=this;r.registerUser=function(){r.processing=!0,e.create(r.userData).success(function(e){t.login(r.userData.username,r.userData.password).success(function(e){r.processing=!1,e.success&&o.path("/u/"+r.userData.username)})})}}]).controller("userProfileController",["$routeParams","User",function(e,t){var o=this;t.getByUsername(e.username).success(function(e){o.userData=e})}]),angular.module("authService",[]).factory("Auth",["$http","$q","AuthToken",function(e,t,o){var r={};return r.login=function(t,r){return e.post("/api/authenticate",{username:t,password:r}).success(function(e){return o.setToken(e.token),e})},r.logout=function(){o.setToken()},r.isLoggedIn=function(){return o.getToken()?!0:!1},r.getUser=function(){return o.getToken()?e.get("/api/me",{cache:!0}):t.reject({message:"User has no token."})},r}]).factory("AuthToken",["$window",function(e){var t={};return t.getToken=function(){return e.localStorage.getItem("token")},t.setToken=function(t){t?e.localStorage.setItem("token",t):e.localStorage.removeItem("token")},t}]).factory("AuthInterceptor",["$q","$location","AuthToken",function(e,t,o){var r={};return r.request=function(e){var t=o.getToken();return t&&(e.headers["x-access-token"]=t),e},r.responseError=function(r){return 403==r.status&&(o.setToken(),t.path("/login")),e.reject(r)},r}]),angular.module("boxService",[]).factory("Box",["$http",function(e){var t={};return t.getByUsername=function(t){return e.get("/api/users/"+t+"/box/")},t.create=function(t){return e.post("/api/box",t)},t.getById=function(t){return e.get("/api/box/"+t)},t.update=function(t,o){return e.put("/api/box/"+t,o)},t["delete"]=function(t){return e["delete"]("/api/box/"+t)},t}]),angular.module("questionService",[]).factory("Question",["$http",function(e){var t={};return t.create=function(t){return e.post("/api/question",t)},t.getForBox=function(t){return e.get("/api/questions/"+t)},t.vote=function(t,o){return e.put("/api/question/"+t,o)},t}]),angular.module("userService",[]).factory("User",["$http",function(e){var t={};return t.get=function(t){return e.get("/api/users/"+t)},t.getByUsername=function(t){return e.get("/api/u/"+t)},t.all=function(){return e.get("/api/users/")},t.create=function(t){return e.post("/api/users/",t)},t.update=function(t,o){return e.put("/api/users/"+t,o)},t["delete"]=function(t){return e["delete"]("/api/users/"+t)},t}]);