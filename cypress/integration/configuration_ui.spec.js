import * as randomstring from 'randomstring'

const uuidRegExp = '[\\w]{8}-[\\w]{4}-[\\w]{4}-[\\w]{4}-[\\w]{12}'

describe('Swarm Tests', function() {
  it('Creates a new swarm', function() {

    // Arrange
    cy.visit('http://localhost:3000/#/swarms/create')

    // Act
    // select the owner
    cy.get('.ra-input-ownerId > .MuiFormControl-root > .MuiInput-root > .MuiSelect-root > .MuiSelect-select')
      .click()
    const ownerName = 'Fake Owner'
    cy.contains('#menu-ownerId .MuiList-root > [tabindex="-1"]', ownerName)
      .click()

    // type the swarm name
    const swarmName = 'Swarm ' + randomstring.generate(7)
    cy.get('#name')
      .type(swarmName)

    // select the theme
    cy.get('.ra-input-themeId > .MuiFormControl-root > .MuiInput-root > .MuiSelect-root > .MuiSelect-select')
      .click()
    const themeName = 'myTheme'
    cy.contains('#menu-themeId .MuiList-root > [tabindex="-1"]', themeName)
      .click()

    // select the campaign
    cy.get('.ra-input-campaignId > .MuiFormControl-root > .MuiInput-root > .MuiSelect-root > .MuiSelect-select')
      .click()
    const campaignName = 'Fake-Campaign'
    cy.contains('#menu-campaignId .MuiList-root > [tabindex="-1"]', campaignName)
      .click()

    // select the display mode
    cy.get('.ra-input-displayMode > .MuiFormControl-root > .MuiInput-root > .MuiSelect-root > .MuiSelect-select')
      .click()
    const displayMode = 'LIST'
    cy.contains('#menu-displayMode .MuiList-root > [tabindex="-1"]', displayMode)
      .click()

    // select the buy mode
    cy.get('.ra-input-buyMode > .MuiFormControl-root > .MuiInput-root > .MuiSelect-root > .MuiSelect-select')
      .click()
    const buyMode = 'TRIGGER'
    cy.contains('#menu-buyMode .MuiList-root > [tabindex="-1"]', buyMode)
      .click()

    // set the single product checkout flag to `true`
    cy.get('#singleProductCheckout')
      .then(checkbox => {
        if (!checkbox.is(':checked')) {
          // if it is not checked, check it, so the state is known
          cy.get('#singleProductCheckout').click()
        }
      })

    // click the Save button
    cy.contains('.Toolbar-defaultToolbar-cb > .MuiButtonBase-root', /save/i)
      .click()

    // Assert
    cy.url().should('match', new RegExp(`\\/#\\/swarms\\/${uuidRegExp}\\/show$`))

    cy.get('.ra-field-id > .MuiFormControl-root .MuiTypography-root').invoke('text')
      .then(text => expect(text).to.match( new RegExp(uuidRegExp)))
    cy.get('.ra-field-ownerId > .MuiFormControl-root .MuiTypography-root').should('contain', ownerName)
    cy.get('.ra-field-name > .MuiFormControl-root .MuiTypography-root').should('contain', swarmName)
    cy.get('.ra-field-themeId > .MuiFormControl-root .MuiTypography-root').should('contain', themeName)
    cy.get('.ra-field-campaignId > .MuiFormControl-root .MuiTypography-root').should('contain', campaignName)
    cy.get('.ra-field-displayMode > .MuiFormControl-root .MuiTypography-root').should('contain', displayMode)
    cy.get('.ra-field-buyMode > .MuiFormControl-root .MuiTypography-root').should('contain', buyMode)
    // new feature for BooleanField accesibility merged on 15.jan.2019; waiting for us to upgrate to test it:
    // TODO: test `active` field is `true`, as set above
  })
})

