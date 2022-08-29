import './style.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

function User() {
  const username = localStorage.getItem('USERNAME') || ''
  return (
    <>
      <div className="userIcon flex items-center">
        <AccountCircleOutlinedIcon />
        <p className="ml-2 text-xs font-semibold">{username}</p>
      </div>
    </>
  )
}

export default User
