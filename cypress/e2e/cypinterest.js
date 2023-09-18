describe("Pinterest", () => {
     beforeEach(() => {
            cy.visit ("https://www.pinterest.com/")
          })

  //handle uncaught exception: https://docs.cypress.io/api/events/catalog-of-events.html#Uncaught-Exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  context("Pinterest", () => {
    let username = Cypress.env("username");
    let password = Cypress.env("password");
    let boardName = Cypress.env("boardName");
    let title = Cypress.env("title");
    let description = Cypress.env("description");
    let filePin = Cypress.env("filePin");
    let linkPin = Cypress.env("linkPin");
    let shortLinkPin = Cypress.env("shortLinkPin");

    it("Log In And Creating a Pin", () => {
      //login
      cy.get('[data-test-id="simple-login-button"]').click()
      cy.get('#email').type(username)
        .should('have.value', username)
      cy.get('#password').type(password)
      cy.get('.DmS').click(); //เปิดการโชว์ Password 
      cy.get('#password').should('have.value', password); //check ว่า Password ควรมีค่า = TQASDB123
      cy.get('[data-test-id="registerFormSubmitButton"]').click() //กดปุ่ม Log In
      cy.wait(5000) //รอ 5 วินาที

    
      //go to pin builder page
      cy.get('[data-test-id="addPinButton"]').click() //กดคลิกปุ่ม Dropdown Create
      cy.get('[data-test-id="create-static-pin"]').click() //กดคลิกปุ่ม Create a Pin
      cy.url().should('eq', 'https://www.pinterest.com/pin-builder/')  // ยืนยัน(assert) url ว่าจะลิงค์ไปที่ url นี้


      //create board  
      cy.get('[data-test-id="board-dropdown-select-button"]').click() //กด Dropdown Select
      cy.get('[data-test-id="create-board"]').click() //เลือกคำว่า Create Board


      //fill board title
      cy.get('[id="boardEditName"]').type(boardName) // ตั้งหัวข้อ Create Board ตาม ชื่อใน Cypress.Config ที่ได้ประกาศไว้
      cy.get('.RCK').eq(4).click() //เลือกลำดับใน Dropdown List ว่า Board นั้นอยู่ลำดับไหน
      cy.get('[data-test-id="board-dropdown-select-button"]')
        .should('contain', boardName) // ตรวจสอบชื่อ BoardName


      //fill title
      cy.get('.TextArea__textArea').eq(0) //เลือก Text Area ที่จะพิมพ์หัวข้อ
        .type(title) // พิมพ์ชื่อ title ตาม ชื่อใน Cypress.Config ที่ได้ประกาศไว้
        .should('have.value', title)


      //upload image
      cy.get('input[type="file"]').attachFile(filePin)
      cy.get('img[alt="Uploaded image"]').should('exist')


      //fill description
      cy.get('.TextArea__textArea').eq(2)
        .type(description)
      cy.contains(description).should('be.visible')


      //add alt text
      cy.get('.RCK').eq(0).click()
      cy.get('.TextArea__textArea').eq(3)
        .type(boardName)
        .should('have.value', boardName)


      //add link
      cy.get('.TextArea__textArea').eq(5).type(linkPin)
        .should('have.value', linkPin)


      //hit save button
      cy.get('[data-test-id="board-dropdown-save-button"]').click()
      cy.wait(15000)
      cy.get('.LCN').eq(0).should('contain', boardName)


      //hit see it now
      cy.get('[data-test-id="seeItNow"]').click()


      //comment
      cy.get('[data-test-id="editor-with-mentions"]').type('บทความนี้ดีมากครับ')
      cy.get('[data-test-id="activity-item-create-submit"]').click()


      //like
      cy.get('[aria-label="reaction"]').click()


      //check link
      cy.get('.tBJ').contains(shortLinkPin).should('be.visible');


      //check length
      cy.get('.tBJ')
        .contains(description).invoke('text')
        .should('have.length', description.length);


      //check title
      cy.get('.lH1')
        .contains(title)
        .should('be.visible');
    });
  });
});