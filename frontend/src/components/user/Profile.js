import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'


const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title = {'Your profile'}/>

                    <h2 className="mt-5 ml-5">Mein Profil</h2>
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                </figure>
                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Profil bearbeiten
                </Link>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Vor- und Nachname</h4>
                 <p>{user.name}</p>
     
                 <h4>Mailadresse</h4>
                 <p>{user.email}</p>

                 <h4>Betgetreten am</h4>
                 <p>{String(user.createdAt).substring(0,10)}</p>

                 {user.role !== 'admin' && (
                    <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                        Meine Aufträge
                    </Link>
                )}

                <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                    Passwort ändern
                </Link>
            </div>
        </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
