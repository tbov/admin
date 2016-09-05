## Voucher App Admin Panel

###Installation Instructions
1 Clone Repo
2 Run npm install (install npm if you do not have it installed)
3 Run bower install (install bower if you do not have it installed)
4 Run npm install in app/bower_components/bootstrap-table/
5 Run npm start to serve the website on port 8000

Currently Working on:
- [ ] Image Upload

Done:
- [x] Setup Project Installations
- [x] Setup Modules
- [x] Login View 
- [x] Login Controller + Service
- [x] Add Admin View 
- [x] Admin Controller + Service 
- [X] Dashboard View integration
- [X] Dashboard Controller
- [X] Auth Service Management
- [X] Voucher Edit View integration
- [ ] Voucher Edit Controller + Service
- [X] Brand Views integration
- [X] Brand Controller + Service
- [~] Image Upload
- [X] Image Preview
- [ ] Token interceptor integration
- [ ] Add edit and delete option in voucher dashboard

###### High level User Stories:
1- As an admin I should be able to sign in, create accounts and logout
**High Sub Tasks:** 
-Setup Admin Module
-Admin Add Page 
-Login View


2-As an admin I should be able to create / update / delete vouchers 

**High Level Sub Tasks:** 
-Setup Voucher Module
-Voucher Dashboard Page
-Voucher Add Page
-Voucher Update page

3-As an admin I should be able to add a brand so the vouchers can be categorized
**High Level Tasks:** 
-Setup Brand Module
-Brand Add Page 
