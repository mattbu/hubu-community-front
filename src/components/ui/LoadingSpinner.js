import { Container, Row, Col, Spinner } from 'react-bootstrap'
function LoadingSpinner({ spinnerPadding }) {
    return (
        <Container className={spinnerPadding}>
            <Row>
                <Col className='text-center'>
                    <Spinner animation="border" />
                </Col>
            </Row>
        </Container>
    )
}

export default LoadingSpinner