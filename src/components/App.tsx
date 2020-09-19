import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import SomeListSingleton from './SomeListSingleton'
import SomeListBlocking from './SomeListBlocking'
import SomeInput from './SomeInput'
import { AppCtx, AppMode } from './AppCtx'
import { InputModel } from './models'
import CircularProgress from '@material-ui/core/CircularProgress'
import SomeListDedicatedWorker from './SomeListDedicatedWorker'
import SomeListWorkerPool from './SomeListWorkerPool'
import { compute } from '../workers/compute'

function App() {
  const [input, setInput] = useState<InputModel>({
    base: 500,
    pow: 2,
    rowCount: 100,
  })
  const [mode, setMode] = useState<AppMode>(AppMode.blocking)

  return (
    <AppCtx.Provider value={{ input, setInput, mode, setMode }}>
      <div className="App">
        <h1>Animation to track UI blocking</h1>
        <CircularProgress />
        <h2>Start editing to see some magic happen!</h2>
        <SomeInput />
        <p>
          Each compute run with {input.base}^{input.pow}(
          {Math.ceil(Math.pow(input.base, input.pow))}) iterations.
        </p>
        <pre>{String(compute)}</pre>
        {mode === AppMode.blocking && <SomeListBlocking />}
        {mode === AppMode.webWorkerSingleton && <SomeListSingleton />}
        {mode === AppMode.webWorkerDedicated && <SomeListDedicatedWorker />}
        {mode === AppMode.webWorkerPool && <SomeListWorkerPool />}
      </div>
    </AppCtx.Provider>
  )
}

declare let module: Record<string, unknown>

export default hot(module)(App)
