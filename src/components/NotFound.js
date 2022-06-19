import { Container, Row, Col } from 'react-bootstrap'
function NotFound() {
    return (
        <Container>
            <Row className='mt-5 pt-5'>
                <Col className='text-center mt-5 pt-5'>
                    <h1>페이지가 존재하지 않습니다.: 404!</h1>
                    <p className='mt-4'>링크를 잘못 입력하셨거나, 페이지가 삭제/이동되었을 수 있습니다.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound