import { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import styles from '../../scss/ui/Pagination.module.scss'

function Pagination({ page, setPage, limit, total }) {
    const numPages = Math.ceil(total / limit)
  
    return (
        <Container className={styles.pagination}>
           <Row>
                <Col className={styles.paginationCol}>
                    <nav>
                        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>{'<'}</Button>
                        { Array(numPages).fill().map((_, i) => (
                            <Button
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                aria-current={page === i + 1 ? "page" : null}
                            >
                                { i + 1 }
                            </Button>  
                        ))}
                        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>{'>'}</Button>
                    </nav>
                </Col>
           </Row>
        </Container>
    )
}

export default Pagination