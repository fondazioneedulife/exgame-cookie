import classes from "./singlesession.module.css";

export const SingleSession: React.FC = () => {
    return (
        <>
            <button className={classes.backButton}>
                Indietro    
            </button>
            <div className={classes.container}>
                <div className={classes.profile}>
                    <div className={classes.avata}></div>
                        <div className={classes.info}>
                            <h2>Mario Rossi</h2>
                            <p>Pixel</p>
                        </div>
                    </div>
                <p className={classes.story}>Storia: sessione del 24/09/2024</p>
            </div>
            <div className={classes.vote}>
                <p className={classes.firstp}> Vote 9/10 </p>
                <p> 0 copie andate a buon fine </p>
                <p> 2 copie intercettate </p>
                <p> 3 biglietti andati a buon fine </p>
                <p> 0 biglietti intercettati </p>

            </div>

        </>
    );
};