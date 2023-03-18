import './index.less'
export default (): JSX.Element => {
  return (
    <div className="loading-warp">
      <svg viewBox="-50 -50 100 100" width="200">
        <defs>
          <g id="spinner">
            <circle r="9" fill="#c6c09c" cx="40" cy="0"></circle>
            <circle r="9" fill="#ffc98b" cx="0" cy="40"></circle>
            <circle r="9" fill="#ffb284" cx="-40" cy="0"></circle>
            <circle r="9" fill="#e79796" cx="0" cy="-40"></circle>
          </g>
        </defs>

        <g className="single" opacity="1">
          <use href="#spinner"></use>
          <g className="single" opacity="0.8">
            <use href="#spinner"></use>
            <g className="single" opacity="0.8">
              <use href="#spinner"></use>
              <g className="single" opacity="0.8">
                <use href="#spinner"></use>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
