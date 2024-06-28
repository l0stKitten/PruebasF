# features/frontend/clientes.feature

@frontend
Feature: Clientes management

  @frontend
  Scenario: Retrieve a list of clientes
    Given there are clientes in the database
    When I request the list of clientes
    Then I should receive a list of clientes

  @frontend
  Scenario: Create a new cliente
    Given I have cliente data
    When I send a request to create a new cliente
    Then the cliente should be created successfully