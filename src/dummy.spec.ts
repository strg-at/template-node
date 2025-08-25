import { getDummyGreeting } from './dummy'
import { expect } from 'chai'

describe('dummy module', () => {
  it('should return the correct greeting', () => {
    expect(getDummyGreeting()).to.equal('Hello from dummy module!')
  })
})
