import {
    FiArrowLeft,
    FiArrowRight,
    FiHome,
    FiSettings,
    FiUser,
    FiUsers,
    FiLogOut,
    FiEdit,
    FiEye,
    FiEyeOff
} from "react-icons/fi";

export const ArrowLeft = ({...props}) => {
    return (
        <FiArrowLeft {...props} />
    );
}

export const ArrowRight = ({...props}) => {
    return (
        <FiArrowRight {...props} />
    );
}

export const Edit = ({...props}) => {
    return (
        <FiEdit {...props} />
    );
}

export const Home = ({...props}) => {
    return (
        <FiHome {...props} />
    );
}

export const Settings = ({...props}) => {
    return (
        <FiSettings {...props} />
    );
}

export const Logout = ({...props}) => {
    return (
        <FiLogOut {...props} />
    );
}

export const User = ({...props}) => {
    return (
        <FiUser {...props} />
    );
}

export const Groups = ({...props}) => {
    return (
        <FiUsers {...props} />
    );
}


export const PasswordOn = ({...props}) => {
    return (
        <FiEye {...props} />
    );
}

export const PasswordOff = ({...props}) => {
    return (
        <FiEyeOff {...props} />
    );
}
