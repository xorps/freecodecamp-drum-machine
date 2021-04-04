import * as React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

type Keys = "Q" | "W" | "E" | "A" | "S" | "D" | "Z" | "X" | "C";

const Audio: Record<Keys, string> = {
    Q: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    W: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    E: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    A: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    S: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    D: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    Z: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    X: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    C: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
};

function Control({label, display}: {label: Keys, display: React.Dispatch<React.SetStateAction<string>>}) {
    const audio = React.useRef<HTMLAudioElement>(null);
    const onClick = () => {
        audio.current!.play();
        display(Audio[label]);
    };
    const onKey = (e: KeyboardEvent) => {
        if (e.key.toUpperCase() === label) onClick();
    };

    React.useEffect(() => {
        const event = "keypress";
        document.addEventListener(event, onKey);
        return () => document.removeEventListener(event, onKey);
    }, []);

    return (
        <Grid item>
            <Button className="drum-pad" id={Audio[label]} onClick={onClick} variant="contained">
                {label}
                <audio className="clip" id={label} ref={audio} src={Audio[label]} />
            </Button>
        </Grid>
    );
}

const ControlRow: React.FC = ({children}) => (
    <Grid container spacing={3}>{children}</Grid>
);

const Keypad = () => {
    const [display, setDisplay] = React.useState("");
    return <>
        <h3 id="display" style={{textAlign: 'center'}}>{display}</h3>
        <Container id="drum-machine" maxWidth="sm">
            <ControlRow>
                <Control label="Q" display={setDisplay} />
                <Control label="W" display={setDisplay} />
                <Control label="E" display={setDisplay} />
            </ControlRow>
            <ControlRow>
                <Control label="A" display={setDisplay} />
                <Control label="S" display={setDisplay} />
                <Control label="D" display={setDisplay} />
            </ControlRow>
            <ControlRow>
                <Control label="Z" display={setDisplay} />
                <Control label="X" display={setDisplay} />
                <Control label="C" display={setDisplay} />
            </ControlRow>
        </Container>
    </>;
};

export default Keypad;