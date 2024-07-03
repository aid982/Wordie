import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Translation from '@/components/words-card-components/translation'

test('Check translation component', () => {
    const testWord =
    {
        id: 1,
        auxiliaryVerb: 'haben',
        german: 'german',
        declination: ['test1', 'test2'],

    }
    render(<Translation onNext={() => { }} word={testWord} />)
    expect(screen.getByText('german')).toBeDefined();
    expect(screen.getByText(/haben/i)).toBeDefined();

    testWord.declination.forEach(element => {
        expect(screen.getByText(element)).toBeDefined();
        
    });

    expect(screen.getByRole('button',{name:'Poor'})).toBeDefined();
    expect(screen.getByRole('button',{name:'Good'})).toBeDefined();
    expect(screen.getByRole('button',{name:'Very good'})).toBeDefined();

    
})


test('Check snap shot',async  () => {
    const testWord =
    {
        id: 1,
        auxiliaryVerb: 'haben',
        german: 'german',
        declination: ['test1', 'test2'],

    }
    const result = render(<Translation onNext={() => { }} word={testWord} />)
    await expect(result).toMatchFileSnapshot('translation.html')    
})