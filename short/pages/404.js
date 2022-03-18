import Head from 'next/head'

export default function ErrorPage() {
    return (
        <div className="container">
            <h1 className="rainbow sans">four oh four.</h1><br></br>
            <h2 className="sans" style={{ marginTop: 0, fontSize: '20px' }}>404.<br></br>there's no url here.<br></br>check your url to make sure it's correct.</h2><br></br>
            <p className="sans" style={{ marginTop: 0, fontSize: '20px' }}>dino.icu is a free domain and link shortener for hack clubbers.</p>
        </div>
    )
}