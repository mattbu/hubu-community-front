import { Container, Row, Col, Spinner } from 'react-bootstrap'
import styles from '../../scss/ui/LoadingSpinner.module.scss'
function LoadingSpinner() {
    return (
        <Container className={styles.spinner}>
            <Row className={styles.spinnerRow}>
                <Col className={styles.spinnerCol}>
                    <Spinner animation="border" />
                </Col>
            </Row>
        </Container>
    )
}

export default LoadingSpinner