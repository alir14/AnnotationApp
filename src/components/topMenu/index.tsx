import React, { ChangeEvent } from 'react'

export interface TopMenuProps {
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TopMenu: React.FunctionComponent<TopMenuProps> = ({
    handleFileChange
}) => {

    return (
        <div className="d-flex align-items-center" style={{ gap: '8px' }}>
            <div>
                <label className="btn btn-primary" tabIndex={199}>
                    <i className="bi bi-cloud-upload"></i> 
                    Upload file
                    <input type="file" accept="video/*" tabIndex={200} onChange={handleFileChange} className="visually-hidden" style={{ display: 'none' }} />
                </label>
            </div>
        </div>

    )
}

export default TopMenu;