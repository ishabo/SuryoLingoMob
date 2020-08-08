import * as h from './index'

jest.mock('@sl/helpers/logging', () => ({
  logError: jest.fn(),
}))

describe('common', () => {
  describe('changeCase', () => {
    const camelCaseObject = {
      object1: 'object 1 value',
      thisIsAnotherObject: { object1: 1, objectTwo: 2 },
    }

    const snakeCaseObject = {
      object_1: 'object 1 value',
      this_is_another_object: { object_1: 1, object_two: 2 },
    }

    it('changes an object of nested objects from camel to snake case', () => {
      expect(h.changeCase(camelCaseObject, 'snake')).toStrictEqual(
        snakeCaseObject,
      )
    })

    it('changes arrays of nested nested objects from camel to snake case', () => {
      const array = [camelCaseObject, camelCaseObject]
      const changedArray = [snakeCaseObject, snakeCaseObject]

      expect(h.changeCase(array, 'snake')).toStrictEqual(changedArray)
    })

    it('changes an objects of nested objects from snake to camel case', () => {
      expect(h.changeCase(snakeCaseObject, 'camel')).toStrictEqual(
        camelCaseObject,
      )
    })

    it('changes array of nested objects from snake to camel case', () => {
      const array = [snakeCaseObject, snakeCaseObject]
      const changedArray = [camelCaseObject, camelCaseObject]

      expect(h.changeCase(array, 'camel')).toStrictEqual(changedArray)
    })
  })

  describe('dashify', () => {
    it('puts dashes instead of chars and ignores spaces', () => {
      expect(h.dashify('this is a test')).toStrictEqual('---- -- - ----')
      expect(h.dashify('هذه مجرد تجربة')).toStrictEqual('--- ---- -----')
      expect(h.dashify('هَذه مًجَرَّي تَجْرِبَة')).toStrictEqual(
        '---- -------- ---------',
      )
    })
  })
})
