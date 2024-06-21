const USERNAME = 'test0';
const PASSWORD = 'test123@';

describe('Auth, login and register tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('successful login scenario', () => {

        cy.intercept('POST', '/tokens').as('loginRequest')
        cy.contains("Login").click()
        cy.get('[data-cy="username-input"]').type(USERNAME)
        cy.get('[data-cy="username-input"]').should('have.value', USERNAME)

        cy.get('[data-cy="password-input"]').type(PASSWORD)
        cy.get('[data-cy="password-input"]').should('have.value', PASSWORD)

        cy.get('[data-cy="login-button"]').click()

        cy.wait('@loginRequest').its('response').then((response) => {
            expect(response.statusCode).to.equal(201)
        })
        cy.url().should('eq', 'http://localhost:5173/')
        cy.contains('Logout')
    })
    it('unsuccessful login scenario', () => {
        cy.intercept('POST', '/tokens').as('loginRequest')
        cy.contains("Login").click()
        cy.get('[data-cy="username-input"]').type('fake')
        cy.get('[data-cy="username-input"]').should('have.value', 'fake')

        cy.get('[data-cy="password-input"]').type('123')
        cy.get('[data-cy="password-input"]').should('have.value', '123')

        cy.get('[data-cy="login-button"]').click()

        cy.wait('@loginRequest').its('response').then((response) => {
            expect(response.statusCode).to.equal(400)
        })
        cy.url().should('eq', 'http://localhost:5173/login')
        cy.contains('Credentials did not match')
    })

    it('account page not accessible when not logged in', () => {
        cy.contains("Account").click()
        cy.url().should('include', '/login')
    })
    it('decks page not accessible when not logged in', () => {
        cy.contains("Deck").click()
        cy.url().should('include', '/login')
    })
    it('shop page not accessible when not logged in', () => {
        cy.contains("Shop").click()
        cy.url().should('include', '/login')
    })
    it('Cards admin page not accessible when not logged in', () => {
        cy.visit('http://localhost:5173/cardsAdmin',)
        cy.url().should('include', '/login')
    })

    it('unsuccessful register scenario - username already exists', () => {
        cy.intercept('POST', '/users').as('registerRequest')
        cy.contains("Register").click()
        cy.get('[data-cy="username-input"]').type('bart')
        cy.get('[data-cy="username-input"]').should('have.value', 'bart')

        cy.get('[data-cy="password-input"]').type('123123123')
        cy.get('[data-cy="password-input"]').should('have.value', '123123123')

        cy.get('[data-cy="register-button"]').click()

        cy.wait('@registerRequest').its('response').then((response) => {
            expect(response.statusCode).to.equal(400)
        })
        cy.url().should('eq', 'http://localhost:5173/register')
        cy.contains('Username already exists')
    })

    it('unsuccessful register scenario - password complexity requirements', () => {
        cy.contains("Register").click()

        cy.get('[data-cy="register-button"]').click()
        cy.contains('Username is required')
        cy.contains('Password is required')

        cy.get('[data-cy="username-input"]').type('test')
        cy.get('[data-cy="username-input"]').should('have.value', 'test')

        cy.get('[data-cy="password-input"]').type('123')
        cy.get('[data-cy="password-input"]').should('have.value', '123')

        cy.get('[data-cy="register-button"]').click()

        cy.url().should('eq', 'http://localhost:5173/register')
        cy.contains('Password must be at least 8 characters')
    })
    it('unsuccessful register scenario - null values', () => {
        cy.contains("Register").click()

        cy.get('[data-cy="register-button"]').click()
        cy.contains('Username is required')
        cy.contains('Password is required')

    })
})

describe('crud functionality Admin', () => {
    beforeEach(() => {
        loginAsAnAdmin()
    })
    it('should create a card with valid data', () => {
        cy.intercept('POST', '/cards').as('createCardRequest')
        cy.get('[data-cy="input-name"]').type('test')
        cy.get('[data-cy="input-name"]').should('have.value', 'test')

        cy.get('[data-cy="input-ap"]').type('1')
        cy.get('[data-cy="input-ap"]').should('have.value', '1')

        cy.get('[data-cy="input-hp"]').type('2')
        cy.get('[data-cy="input-hp"]').should('have.value', '2')

        cy.get('[data-cy="btn-create"]').click()
        cy.wait('@createCardRequest').its('response').then((response) => {
            expect(response.statusCode).to.equal(200)
        })
        cy.contains('test')
    });

    it('should not create a card with invalid data', () => {

        cy.get('[data-cy="btn-create"]').click()
        cy.contains('Name is required')
        cy.contains('Attack Points are required')
        cy.contains('Health Points are required')

        cy.get('[data-cy="input-name"]').type('ThisIsAReallyLongCardName')
        cy.get('[data-cy="input-name"]').should('have.value', 'ThisIsAReallyLongCardName')
        cy.contains('Name cannot exceed 20 characters')


        cy.get('[data-cy="input-ap"]').type('-1')
        cy.get('[data-cy="input-ap"]').should('have.value', '-1')
        cy.contains('Attack Points must be at least 0')
        cy.get('[data-cy="input-ap"]').clear()

        cy.get('[data-cy="input-ap"]').type('21')
        cy.get('[data-cy="input-ap"]').should('have.value', '21')
        cy.contains('Attack Points cannot exceed 20')

        cy.get('[data-cy="input-hp"]').type('-1')
        cy.get('[data-cy="input-hp"]').should('have.value', '-1')
        cy.contains('Health Points must be at least 0')
        cy.get('[data-cy="input-hp"]').clear()

        cy.get('[data-cy="input-hp"]').type('21')
        cy.get('[data-cy="input-hp"]').should('have.value', '21')
        cy.contains('Health Points cannot exceed 20')

    });
    it('should update a card', () => {
        cy.intercept('PUT', `/cards/*`).as('updateRequest')
        cy.get('[data-cy="card-content"]').contains('.title', 'test').should('be.visible').parents('.card-container').then(cardContainer => {
            cy.wrap(cardContainer).find('[data-cy="btn-update"]').should('be.visible').click();
        });

        cy.url().should('include', '/updateCard')

        cy.get('[data-cy="input-name"').type("1")
        cy.get('[data-cy="input-ap"').clear()
        cy.get('[data-cy="input-ap"').type("2")
        cy.get('[data-cy="input-hp"').clear()
        cy.get('[data-cy="input-hp"').type("5")
        cy.get('[data-cy="btn-submit"').click()

        cy.wait('@updateRequest').its('response').then((response) => {
            expect(response.statusCode).to.equal(200)
        })
        cy.url().should('include', '/cardsAdmin')
        cy.contains("test1")
    });
    it('should delete a card', () => {
        cy.intercept('DELETE', `/cards/*`).as('deleteRequest')
        cy.get('[data-cy="card-content"]').contains('.title', 'test1').should('be.visible').parents('.card-container').then(cardContainer => {
            cy.wrap(cardContainer).find('[data-cy="btn-delete"]').should('be.visible').click();
            cy.wait('@deleteRequest').its('response').then((response) => {
                expect(response.statusCode).to.equal(204)
            })
            cy.url().should('include', '/cardsAdmin')
            cy.contains("test1").should('not.exist');
        });
    });
});


function login() {
    cy.visit('http://localhost:5173/login')
    cy.get('[data-cy="username-input"]').type(USERNAME)
    cy.get('[data-cy="password-input"]').type(PASSWORD)
    cy.get('[data-cy="login-button"]').click()

}

function loginAsAnAdmin() {
    cy.visit('http://localhost:5173/login')
    cy.get('[data-cy="username-input"]').type('jeff')
    cy.get('[data-cy="password-input"]').type('123')
    cy.get('[data-cy="login-button"]').click()

}