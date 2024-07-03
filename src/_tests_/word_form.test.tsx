import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import WordForm from '../components/forms/word-form'
 
test('Page', () => {
  render(<WordForm fill={false} className='' categories={[{id:1,name:'test'}]} onUpdate={()=>{}} name='test' word={{
    id:1,
    auxiliaryVerb:'haben',
    englisch:'eng',
    german:'germ',    
    russian:'',
    categories:[],
    declination:[],
    userId:'',
    qtyShown:1,
    rating:1,
    userRating:1

  }}/>)
  expect(screen.getByRole('button', { name: 'test' })).toBeDefined()
})