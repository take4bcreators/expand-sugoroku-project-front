import React from 'react';


type ThisPageProps = {
  length: number,
  current: number,
}

export default ({length, current}: ThisPageProps) => {
  const numberArr = [...Array(length).keys()];
  return (
    <div className="p-setup-progress-tracker">
    <div className="p-setup-progress-tracker__circlewrapper">
    {
      numberArr.map((num, index) => {
        if (num === current) {
          return <div className="p-setup-progress-tracker__circle is-current" key={index}></div>
        } else {
          return <div className="p-setup-progress-tracker__circle" key={index}></div>
        }
      })
    }
    </div>
    <div className="p-setup-progress-tracker__bar"></div>
    </div>
  )
}
