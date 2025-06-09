import { render } from '@testing-library/react'
import type { ReactElement } from 'react'

export { render }

export const testRender = (ui: ReactElement) => {
  return render(ui)
}
