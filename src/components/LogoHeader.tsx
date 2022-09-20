import LOGO from '../Assets/logo.png'


const LogoHeader = () => {
  return (
    <div className="flex flex-row justify-center items-center mt-5 mb-14">
      <div className="h-12 w-12 mr-3 self-center">
        <img src={LOGO} alt="Ebooks" className="object-fill self-center" />
      </div>
      <span className="text-2xl font-bold">EBOOKS</span>
    </div>
  )
}

export default LogoHeader