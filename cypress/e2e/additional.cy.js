describe('Deck actions', () => {
    beforeEach(() => {
        login();
    })
    it('should transfer card from owned cards to deck', () => {
        cy.contains('Deck').click()
        const cardSelector = '[data-cy="owned-card"]';
        const deckContainer = '[data-cy="deck-container"]';
        const ownedContainer = '[data-cy="owned-container"]';

        // Log to console for debugging
        cy.log('Ensure the deck container starts empty');
        cy.get(deckContainer).find(cardSelector).should('have.length', 0);

        // Wait for the owned cards to be rendered
        cy.log('Waiting for owned cards to be available');
        cy.get(ownedContainer).find(cardSelector).should('have.length.greaterThan', 0);

        // Drag the card from owned cards to deck
        cy.log('Dragging card from owned cards to deck');
        cy.dragAndDrop(cardSelector, deckContainer);

        // Verify the card has been added to the deck
        cy.log('Verify the card has been added to the deck');
        cy.get(deckContainer).find(cardSelector).should('have.length', 1);

        // Verify the card has been removed from the owned cards container
        cy.log('Verify the card has been removed from the owned cards container');
        cy.get(ownedContainer).find(cardSelector).should('have.length.lessThan', 1);
    });


    it('should transfer card from deck to owned cards', () => {
        cy.contains("Deck").click()
        const cardSelector = '[data-cy="deck-card"]'; // Selector for a deck card
        const ownedCardsContainer = '[data-cy="owned-container"]'; // Selector for the owned cards container

        // Verify initial state
        cy.get(ownedCardsContainer).find(cardSelector).should('have.length', 0);

        // Drag the card from deck to owned cards
        cy.dragAndDrop(cardSelector, ownedCardsContainer);

        // Verify the card has been added to the owned cards
        cy.get(ownedCardsContainer).find(cardSelector).should('have.length', 1);
    });

})