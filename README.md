# HUBU Community Frontend

✍🏻 작업하면서 막혔던 부분을 기록해보려고 한다.

### 🧨 유저 드랍다운의 blur 이벤트 에러

blur 이벤트는 포커스를 잃을 때 발생하지만 모바일 기기에서 blur 이벤트가 실행이 안되는 에러를 발견하였다.
ios에서는 이벤트를 탭하면 포커스를 맞춘 상태로 유지된다고 한다. 검색 결과 ios에서 mouseout 이벤트가 blur 이벤트와 유사하게 작동한다고 한다.

그래서 앱에 `react-device-detect` 라이브러리를 추가해, ios를 감지하여서 드랍다운의 이벤트리스너를 조건별로 추가하는 방향으로 해결하였다.

#### 해결방법

+ 먼저 `yarn add react-device-detect`로 라이브러리를 설치
+ UserDropdown.js 파일에 라이브러리로 부터 isIOS를 import

```javascript
// UserDropdown.js
import { isIOS } from 'react-device-detect'
```
+ **버튼에 onMouseOut 이벤트 리스너를 삼항연산자로 추가하고 확인 결과 잘 작동하였다.**

```javascript
 <button
       className={styles.userDropdownToggle}
       onClick={() => toggleDropdown('toggle')}
       onBlur={() => toggleDropdown('remove')}
       onMouseOut={isIOS ? () => toggleDropdown('remove') : null}
  >
```
| 참고자료 |
|:----------|
<https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html>
<https://stackoverflow.com/questions/13492881/why-is-blur-event-not-fired-in-ios-safari-mobile-iphone-ipad>
<https://velog.io/@s_keyyy/blur-event-ios-%EC%A0%81%EC%9A%A9%EB%B6%88%EA%B0%80>
