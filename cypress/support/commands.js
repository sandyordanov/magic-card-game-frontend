// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('dragAndDrop', (subject, target) => {
    Cypress.log({
        name: 'DRAGNDROP',
        message: `Dragging element to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 10;

    cy.get(target).first().then($target => {
        let coordsDrop = $target[0].getBoundingClientRect();
        cy.get(subject).first().then(subject => {
            const coordsDrag = subject[0].getBoundingClientRect();
            cy.wrap(subject)
                .trigger('mousedown', {
                    button: BUTTON_INDEX,
                    clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                    clientY: coordsDrag.y,
                    force: true
                });

// Trigger mousemove event on the drop target to simulate dragging over it
            cy.get(target)
                .trigger('mousemove', {
                    button: BUTTON_INDEX,
                    clientX: coordsDrop.x + SLOPPY_CLICK_THRESHOLD,
                    clientY: coordsDrop.y,
                    force: true
                });

// Trigger mouseup event on the drop target to release the click
            cy.get(target)
                .trigger('mouseup', {
                    button: BUTTON_INDEX,
                    force: true
                });
        });
    });
});