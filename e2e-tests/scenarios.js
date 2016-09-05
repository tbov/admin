'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });


  describe('login', function() {

    beforeEach(function() {
      browser.get('index.html#!/login');
    });


    it('should render login when user navigates to /login', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for login/);
    });

  });


  describe('dashboard', function() {

    beforeEach(function() {
      browser.get('index.html#!/dashboard');
    });


    it('should render dashboard when user navigates to /dashboard', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for dashboard/);
    });

  });

    describe('adminAdd', function() {

    beforeEach(function() {
      browser.get('index.html#!/add_admin');
    });


    it('should render adminAdd when user navigates to /add_admin', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for adminAdd/);
    });

  });

  describe('addVoucher', function() {

    beforeEach(function() {
      browser.get('index.html#!/add_voucher');
    });


    it('should render addVoucherForm when user navigates to /add_voucher', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for add voucher/);
    });

  });

    describe('editVoucher', function() {

    beforeEach(function() {
      browser.get('index.html#!/edit_voucher');
    });


    it('should render editVoucherForm when user navigates to /edit_voucher', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for edit voucher/);
    });

  });

    describe('addBrand', function() {

    beforeEach(function() {
      browser.get('index.html#!/add_brand');
    });


    it('should render addBrandForm when user navigates to /add_brand', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for add brand/);
    });

  });

   describe('editBrand', function() {

    beforeEach(function() {
      browser.get('index.html#!/edit_brand');
    });


    it('should render editBrandForm when user navigates to /edit_brand', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for edit brand/);
    });

  });   
});
