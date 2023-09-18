describe("Pinterest", () => {
  context("Created a pin", () => {
     beforeEach(() => {
            cy.visit ("https://www.pinterest.com/")
          })
    let username = 'sdbtqa@gmail.com';
    let password = 'TQASDB123';

    it("Log In And Creating a Pin", () => {

      //login
      cy.get('[data-test-id="simple-login-button"]').click();
      cy.get('#email').type(username) 
        .should('have.value', username)
      cy.get('#password').type(password)
      cy.get('.DmS').click(); //เปิดการโชว์ Password 
      cy.get('#password').should('have.value', password) //check ว่า Password ควรมีค่า = TQASDB123
      cy.get('[data-test-id="registerFormSubmitButton"]').click();

      //go to pin builder page
      cy.get('.JME > .gUZ').click({force: true}) //กดคลิกปุ่ม Dropdown Create
      cy.get('[data-test-id="create-static-pin"]').click({force: true}) //กดคลิกปุ่ม Create a Pin
      cy.url().should('eq', 'https://www.pinterest.com/pin-builder/') // ยืนยัน(assert) url ว่าจะลิงค์ไปที่ url นี้

      //create board  
      cy.get('[data-test-id="board-dropdown-select-button"]').click(); //กด Dropdown Select
      cy.get('[data-test-id="create-board"]').click(); //เลือกคำว่า Create Board

      //fill title of board
      cy.get('#boardEditName').type('Photographer Tips') // ตั้งหัวข้อ Create Board ว่า "Photographer Tips"
      cy.get('[.RCK Hsu USg adn CCY NTm KhY S9z F10 xD4 fZz hUC Il7 Jrn hNT BG7]').click(); //กดปุ่ม Submit
      //cy.get()
      cy.get('[data-test-id="board-dropdown-select-button"]').should('eq', 'Photographer Tips') //ตรวจสอบว่าใน Dropdown Select มี "Photographer Tips" มั้ย

      //create pin
      cy.findByPlaceholderText('Add your title') //หา Text "Add your title" ที่ถูกฝังอยู่ 
      .type('BEST 10 TIPS FOR AUTHENTIC INSTAGRAM PHOTOS OF YOUR TRAVELS') //กดพิมพ์ "BEST 10 TIPS FOR AUTHENTIC INSTAGRAM PHOTOS OF YOUR TRAVELS"
      .should('have.value', 'BEST 10 TIPS FOR AUTHENTIC INSTAGRAM PHOTOS OF YOUR TRAVELS') //ตรวจสอบว่ามีข้อความนี้มั้ย

      //upload image
      cy.fixture('TipsPhoto.png').then(fileContent => {  
      cy.get('[data-test-id="media-upload-input-23b1395e-96c9-4a3f-8869-6164a215fca9"]') 
      .click().attachFile({                        // คลิกเพืื่อ อัพโหลดไฟล์เข้า
        fileContent: fileContent.toString(),
            fileName: 'TipsPhoto.png',              //ชื่อไฟล์
            mimeType: 'image/png'                   //ประเภทไฟล์
          });
       });
      cy.contains('TipsPhoto.png');

      //fill description
      cy.get('[data-test-id="editor-with-mentions"]')
      .type('Instagram is the perfect way to share your travel adventures with your tribe around the world. It’s one of my favorite things to do. Scrolling through my feed I’m like ‘oh look she’s there and he’s here. Wow, it looks great. I wanna go there as well.’ The sharing part is not the most difficult aspect of Instagram.')
      .should('have.value', 'Instagram is the perfect way to share your travel adventures with your tribe around the world. It’s one of my favorite things to do. Scrolling through my feed I’m like ‘oh look she’s there and he’s here. Wow, it looks great. I wanna go there as well.’ The sharing part is not the most difficult aspect of Instagram.')

      //add emoji
      cy.get('[aria-label="Select an emoji"]').click(); //กดปุ่มเลือก emoji
      cy.get('[aria-label="Travel & Places"]').click(); //กดเลือก Place
      cy.get('[aria-label="mountain"]').click(); //กดเลือกภูเขา
      cy.get('[data-test-id="editor-with-mentions"]').contains('🏔') // ตรวจสอบการแสดงicon ภูเขา

      //add alt text
      cy.get('[data-test-id="pin-draft-alt-text-button"]').click(); // กดปุ่ม alt 
      cy.get('#pin-draft-alttext-7481d44e-0e3c-4686-a45f-3a243d12c67d') 
      .type('Photographer Tips') // พิมพ์ alt = Photographer Tips
      .should('have.value', 'Photographer Tips') //
      cy.get('[data-test-id="pin-draft-link"]').type('https://medium.com/@sdbtqa/best-10-tips-for-authentic-instagram-photos-of-your-travels-67242916aa5d')
      .should('have.value', 'https://medium.com/@sdbtqa/best-10-tips-for-authentic-instagram-photos-of-your-travels-67242916aa5d');

      //hit save button
      cy.get('[data-test-id="board-dropdown-save-button"]').click();
      cy.get('.LCN Lej zI7 iyn Hsu').should('have.value', 'Saved to Photographer Tips');
    })
  })
})


// describe("Homepage page", () => {
//   context("Pinterest", () => {
//     beforeEach(() => {
//       cy.visit("https://www.pinterest.com/")
//     })
//     it("Log In Pinterest", () => {
//       cy.get('[data-test-id="simple-login-button"]').click();
//       cy.get('#email').type('sdbtqa@gmail.com')
//       cy.get('#password').type('TQASDB123')
//       cy.get('.DmS').click();
//       cy.get('[data-test-id="registerFormSubmitButton"]').click(); // Log In Button Available (1)
//       //cy.get('button[type=submit]').as('LoginBtn').click(); // Log In Button Available (2)
//       //cy.get("input[name=username]").type(username);
//       //cy.get("input[name=password]").type(password).type("{enter}"); // '{enter}' submits the form
//       it("test", () => {
        
//         // //go to pin builder page
//         // cy.get('[data-test-id="addPinButton"]').click();
//         // cy.get('[data-test-id="create-static-pin"]').click();
//         // cy.url().should('eq', 'https://www.pinterest.com/pin-builder/')
//         // //create board  
//         // cy.get('[data-test-id="board-dropdown-select-button"]').click();
//         // cy.get('[data-test-id="create-board"]').click();
//         // //fill title
//         // cy.get('[id="boardEditName"]').type('Photographer Tips')
//         // cy.get('[class="RCK Hsu USg adn CCY NTm KhY S9z F10 xD4 fZz hUC Il7 Jrn hNT BG7"]').click();
//         // cy.get('[data-test-id="board-dropdown-select-button"]').should('eq', 'Photographer Tips')
//       })
//     })
//   })
// })