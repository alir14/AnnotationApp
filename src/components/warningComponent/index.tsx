import React from 'react'

export interface WarningMessageProps {
    message: string;
}

const WarningMessage: React.FunctionComponent<WarningMessageProps> = ({ message }) => {
    return (
        <div className="alert alert-warning d-flex align-items-center" role="alert">
            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlinkHref="#exclamation-triangle-fill" /></svg>
            <div>
                {message}
            </div>
        </div>
    )
}

export default WarningMessage;
