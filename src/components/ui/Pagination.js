import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import styles from '../../scss/ui/Pagination.module.scss'

function Pagination({ currentPage, setCurrentPage, perPage, total }) {
    const pagesCount = Math.ceil(total / perPage)

    let isPageNumberOutOfRange;

    // const pageNumbers = Array(Math.ceil(total / perPage)).fill().map((_, i) => i + 1)

    const pageNumbers = Array(Math.ceil(total / perPage)).fill().map((_, i) => {
        const pageNumber = i + 1
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === pagesCount;
        const isCurrentPageWithinTwoPageNumbers = (Math.abs(pageNumber - currentPage) < 2);

        if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
            isPageNumberOutOfRange = false;
            return (
                <button
                    key={pageNumber}
                    type="button"
                    className={styles.paginationPageBtn}
                    onClick={() => setCurrentPage(i + 1)}
                    aria-current={currentPage === i + 1 ? 'page' : null}
                >
                    <span>{pageNumber}</span>
                </button>
            )
        }

        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;
            return (
                <button key={`separator-${i}`} className={styles.paginationPageBtn}><span>...</span></button>
            )
        }
        // return null;
    })
  
    return (
        <Container className={styles.pagination}>
        <Row>
             <Col className={styles.paginationCol}>
                 <nav>
                     <button className={styles.paginationNavBtn} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        <span>{'<'}</span>
                     </button>
                     {pageNumbers}
                     <button className={styles.paginationNavBtn} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pagesCount}>
                        <span>{'>'}</span>
                     </button>
                 </nav>
             </Col>
        </Row>
     </Container>

        // <Container className={styles.pagination}>
        //    <Row>
        //         <Col className={styles.paginationCol}>
        //             <nav>
        //                 <button className={styles.paginationNavBtn} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>

        //                 { pageNumbers.map((num, i) => (
        //                     (i + 1 === 1) || (i + 1 === pageNumbers.length) || Math.abs(i + 1 === currentPage) <= 2 ?
        //                     <button
        //                         key={i + 1}
        //                         type="button"
        //                         className={styles.paginationPageBtn}
        //                         onClick={() => setCurrentPage(i + 1)}
        //                         aria-current={currentPage === i + 1 ? 'currentPage' : null}
        //                     >
        //                         { i + 1 }
        //                     </button> : <span key={`seperator${i}`}>...</span>
        //                 )) }

        //                 {/* <button className={styles.paginationPageBtn}>...</button> */}
        //                 <button className={styles.paginationNavBtn} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pagesCount}>{'>'}</button>
        //             </nav>
        //         </Col>
        //    </Row>
        // </Container>
    )
}

export default Pagination