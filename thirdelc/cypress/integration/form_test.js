describe("Test the inputs", function() {
	beforeEach(function() {
		cy.visit("http://localhost:3000/")
	})
	it("fill out the inputs", function () {
		cy.get('[data-cy="name"]').type("Matthew").should("have.value", "Matthew")
		cy.get('[data-cy="email"]').type("3jmcoding@3jmcoding.com").should("have.value", "3jmcoding@3jmcoding.com")
		cy.get('[data-cy="password"]').type("Gudmord").should("have.value", "Gudmord")
		cy.get('[data-cy="confirmPassword"]').type("Gudmord").should("have.value", "Gudmord")
		cy.get('[data-cy="reasons"]').type("Matthew").should("have.value", "Matthew")
		cy.get("#quirks").select("Mind Control").should("have.value", "Mind Control")
		cy.get('[type="checkbox"]').check().should("be.checked")
		cy.contains("Submit").click()
	})
})