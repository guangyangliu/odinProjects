
import { capitalize, reverseString, calculator, caesarCipher, analyzeArray } from ".";

test('capitalize-abc', ()=>{
    expect(capitalize('abc')).toBe('Abc');
})
test('capitalize-empty', ()=>{
    expect(capitalize('')).toBe('');
})

test('reverse abc', ()=>{
    expect(reverseString('abc')).toBe('cba');
})

test('reverse abc', ()=>{
    expect(reverseString('')).toBe('');
})


test('add', ()=>{
    expect(calculator().add(1,1)).toBe(2);
})

test('sub', ()=>{
    expect(calculator().subtract(1,1)).toBe(0);
})

test('divide', ()=>{
    expect(calculator().divide(10,1)).toBe(10);
})

test('divide by 0', ()=>{
    expect(calculator().divide(10,0)).toBe(Infinity);
})

test('multiply', ()=>{
    expect(calculator().multiply(10,0)).toBe(0);
})

test('caesarCipher', ()=>{
    expect(caesarCipher('abc', 1)).toBe('bcd');
})

test('caesarCipher', ()=>{
    expect(caesarCipher('abc', 2)).toBe('cde');
})

test('caesarCipher', ()=>{
    expect(caesarCipher('abc', 3)).toBe('def');
})

test('caesarCipher', ()=>{
    expect(caesarCipher('abc', 26)).toBe('abc');
})

test('caesarCipher', ()=>{
    expect(caesarCipher('abc', 0)).toBe('abc');
})

test('analyzeArray', ()=>{
    expect(analyzeArray([1,8,3,4,2,6])).toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6
      });
})

test('analyzeArray', ()=>{
    expect(analyzeArray([0])).toEqual({
        average: 0,
        min: 0,
        max: 0,
        length: 1
      });
})