import { CircularProgress } from '@material-ui/core'

export const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.3)',
      height: '100%',
      zIndex: 999
    }}
  >
    <CircularProgress />
  </div>
)
