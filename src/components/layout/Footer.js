import styles from '../../scss/layout/Footer.module.scss'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <Container fluid className={styles.footerContainer}>
            <Container>
                <Row>
                    <Col>
                        <span>Copyright <span className={styles.navBrand}>HUBU.</span> All Rights Reserved.</span>
                    </Col>
                </Row>
            </Container>
        </Container>   
    )
}

export default Footer