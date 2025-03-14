// login.js
document.addEventListener('DOMContentLoaded', function() {
    // ตรวจสอบว่ามีข้อมูลที่จัดเก็บไว้หรือไม่เมื่อโหลดหน้า
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }

    // การแสดง ซ่อนรหัสผ่าน
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // เอฟเฟกต์focus และ blur ใน input fields
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // CSS สำหรับ success modal
    if (!document.getElementById('success-modal-style')) {
        const successModalStyle = document.createElement('style');
        successModalStyle.id = 'success-modal-style';
        successModalStyle.textContent = `
            .success-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
            }
            
            .success-modal-overlay.show {
                opacity: 1;
                visibility: visible;
            }
            
            .success-modal {
                background-color: white;
                border-radius: 10px;
                padding: 30px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
                transform: translateY(20px);
                opacity: 0;
                transition: transform 0.5s, opacity 0.5s;
            }
            
            .success-modal-overlay.show .success-modal {
                transform: translateY(0);
                opacity: 1;
            }
            
            .success-icon {
                width: 80px;
                height: 80px;
                background-color: #4CAF50;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto 20px;
                color: white;
                font-size: 40px;
                animation: scaleIn 0.5s 0.2s both;
            }
            
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
            
            .success-title {
                color: #333;
                font-size: 24px;
                margin-bottom: 10px;
                animation: fadeInUp 0.5s 0.4s both;
            }
            
            .success-message {
                color: #666;
                font-size: 16px;
                margin-bottom: 25px;
                animation: fadeInUp 0.5s 0.6s both;
            }
            
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .success-button {
                background: linear-gradient(45deg, #4CAF50, #2E7D32);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s;
                animation: fadeInUp 0.5s 0.8s both;
            }
            
            .success-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(46, 125, 50, 0.3);
            }
            
            .success-button:active {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(successModalStyle);
    }

    // การจัดการฟอร์มล็อกอิน
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // รีเซ็ตข้อความแสดงข้อผิดพลาด
        document.getElementById('emailError').style.display = 'none';
        document.getElementById('passwordError').style.display = 'none';
        
        // ลบข้อความแนะนำการสมัครสมาชิกที่อาจมี
        const existingRegisterSuggestion = document.querySelector('.register-suggestion');
        if (existingRegisterSuggestion) {
            existingRegisterSuggestion.remove();
        }
        
        // รีเซ็ตสถานะ error ของ input
        document.getElementById('email').classList.remove('error');
        document.getElementById('password').classList.remove('error');
        
        // รับค่าจากฟอร์ม
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        let isValid = true;
        
        // ตรวจสอบรูปแบบอีเมล
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const emailError = document.getElementById('emailError');
            emailError.textContent = 'กรุณาใส่อีเมลให้ถูกต้อง';
            emailError.style.display = 'block';
            document.getElementById('email').classList.add('error');
            isValid = false;
        }
        
        // ตรวจสอบรหัสผ่าน
        if (password.length < 6) {
            const passwordError = document.getElementById('passwordError');
            passwordError.textContent = 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
            passwordError.style.display = 'block';
            document.getElementById('password').classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // แสดงการโหลด
            const button = document.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังเข้าสู่ระบบ...';
            button.disabled = true;
            
            // ตรวจสอบข้อมูลผู้ใช้จาก localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            setTimeout(() => {
                if (user) {
                    // จัดการกับ Remember Me
                    if (rememberMe) {
                        localStorage.setItem('rememberedEmail', email);
                    } else {
                        localStorage.removeItem('rememberedEmail');
                    }
                    
                    // บันทึกข้อมูลผู้ใช้ที่ล็อกอิน
                    localStorage.setItem('currentUser', JSON.stringify({
                        fullName: user.fullName,
                        email: user.email,
                        phone: user.phone,
                        registerDate: user.registerDate || new Date().toISOString(),
                        loggedInAt: new Date().toISOString()
                    }));
                    
                    // การเข้าสู่ระบบสำเร็จ - แสดง success modal
                    showSuccessModal(user.fullName);
                } else {
                    // ล็อกอินไม่สำเร็จ
                    button.innerHTML = originalText;
                    button.disabled = false;
                    
                    // ตรวจสอบว่ามีผู้ใช้ที่ใช้อีเมลนี้ไหม
                    const emailExists = users.some(u => u.email === email);
                    
                    if (emailExists) {
                        // มีอีเมลในระบบแต่รหัสผ่านไม่ถูกต้อง
                        document.getElementById('passwordError').textContent = 'รหัสผ่านไม่ถูกต้อง';
                        document.getElementById('passwordError').style.display = 'block';
                        document.getElementById('password').classList.add('error');
                    } else {
                        // ไม่พบอีเมลในระบบ
                        document.getElementById('emailError').textContent = 'ไม่พบบัญชีผู้ใช้นี้ กรุณาสมัครสมาชิกก่อน';
                        document.getElementById('emailError').style.display = 'block';
                        document.getElementById('email').classList.add('error');
                        
                        // CSS ลิงก์แนะนำ
                        if (!document.getElementById('register-suggestion-style')) {
                            const style = document.createElement('style');
                            style.id = 'register-suggestion-style';
                            style.textContent = `
                                .register-suggestion {
                                    margin-top: 10px;
                                    padding: 10px;
                                    background-color: rgba(76, 175, 80, 0.1);
                                    border-radius: 5px;
                                    text-align: center;
                                    animation: fadeIn 0.5s, fadeOut 0.5s 8s forwards;
                                }
                                .highlight-link {
                                    color: #4CAF50;
                                    font-weight: bold;
                                    text-decoration: none;
                                }
                                .highlight-link:hover {
                                    text-decoration: underline;
                                }
                                @keyframes fadeIn {
                                    from { opacity: 0; }
                                    to { opacity: 1; }
                                }
                                @keyframes fadeOut {
                                    from { opacity: 1; }
                                    to { opacity: 0; visibility: hidden; }
                                }
                            `;
                            document.head.appendChild(style);
                        }
                        
                        // ลิงกแนะนำการสมัครสมาชิก
                        const registerLink = document.createElement('div');
                        registerLink.className = 'register-suggestion';
                        registerLink.innerHTML = '<p>ยังไม่มีบัญชี? <a href="register.html" class="highlight-link">สมัครสมาชิกเลย</a></p>';
                        
                        // ลิงหลังข้อความแสดงข้อผิดพลาด
                        const emailErrorElement = document.getElementById('emailError');
                        emailErrorElement.parentNode.insertBefore(registerLink, emailErrorElement.nextSibling);
                        
                        // ตั้งเวลาให้ข้อความแนะนำหายไปหลังจาก 8 วินาที
                        setTimeout(() => {
                            // ตรวจสอบว่ายังอยู่ไหมก่อนที่จะลบ
                            if (registerLink.parentNode) {
                                registerLink.remove();
                            }
                        }, 8500); // 8.5 วินาที 
                    }
                }
            }, 1500);
        }
    });

    // ฟังก์ชันแสดง succeหห modal
    function showSuccessModal(fullName) {
        // modal element
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'success-modal-overlay';
        
        modalOverlay.innerHTML = `
            <div class="success-modal">
                <div class="success-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h2 class="success-title">เข้าสู่ระบบสำเร็จ!</h2>
                <p class="success-message">ยินดีต้อนรับ ${fullName} ครอบครัวของเรา</p>
                <button class="success-button" id="continueButton">
                    <i class="fas fa-arrow-right"></i> เข้าสู่ระบบ
                </button>
            </div>
        `;
        
        // modal เข้าไปใน DOM
        document.body.appendChild(modalOverlay);
        
        // modal ด้วย animation
        setTimeout(() => {
            modalOverlay.classList.add('show');
        }, 10);
        
        // event listener สำหรับปุ่มดำเนินการต่อ
        document.getElementById('continueButton').addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
    }

    // การจัดการลิงก์ลืมรหัสผ่าน
    document.getElementById('forgotPassword').addEventListener('click', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // modal สำหรับรีเซ็ตรหัสผ่าน
        const modalHTML = `
            <div class="modal" id="resetPasswordModal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>รีเซ็ตรหัสผ่าน</h2>
                    <p>กรุณากรอกอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน</p>
                    <div class="form-group">
                        <input type="email" id="resetEmail" value="${email}" placeholder="กรอกอีเมลของคุณ" required>
                    </div>
                    <button type="button" id="sendResetLink" class="btn-reset">
                        <i class="fas fa-paper-plane"></i> ส่งลิงก์รีเซ็ตรหัสผ่าน
                    </button>
                </div>
            </div>
        `;
        
        // modal เข้าไปใน DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // CSS สำหรับ modal
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .modal {
                display: block;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                animation: fadeIn 0.3s;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background-color: white;
                margin: 15% auto;
                padding: 25px;
                border-radius: 10px;
                width: 400px;
                max-width: 90%;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                position: relative;
                animation: slideDown 0.4s;
            }
            
            @keyframes slideDown {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .close-modal {
                position: absolute;
                right: 15px;
                top: 10px;
                font-size: 24px;
                cursor: pointer;
                color: #aaa;
            }
            
            .close-modal:hover {
                color: #555;
            }
            
            .btn-reset {
                background: linear-gradient(45deg, #4CAF50, #2E7D32);
                margin-top: 10px;
            }
        `;
        document.head.appendChild(modalStyle);
        
        // การปิด modal
        document.querySelector('.close-modal').addEventListener('click', function() {
            document.getElementById('resetPasswordModal').remove();
        });
        
        // การคลิกนอก modal
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('resetPasswordModal');
            if (event.target === modal) {
                modal.remove();
            }
        });
        
        // จัดการการส่งลิงก์รีเซ็ตรหัสผ่าน
        document.getElementById('sendResetLink').addEventListener('click', function() {
            const resetEmail = document.getElementById('resetEmail').value;
            
            if (!resetEmail) {
                alert('กรุณากรอกอีเมล');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(resetEmail)) {
                alert('กรุณากรอกอีเมลให้ถูกต้อง');
                return;
            }
            
            // ตรวจสอบว่ามีผู้ใช้ที่ใช้อีเมลนี้ไหมมม
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = users.some(u => u.email === resetEmail);
            
            // แสดงการโหลด
            const button = document.getElementById('sendResetLink');
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่ง...';
            button.disabled = true;
            
            setTimeout(() => {
                if (userExists) {
                    alert(`ระบบได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง ${resetEmail} แล้ว กรุณาตรวจสอบอีเมลของคุณ`);
                } else {
                    alert(`ไม่พบบัญชีผู้ใช้ที่ลงทะเบียนด้วยอีเมล ${resetEmail} กรุณาตรวจสอบอีเมลหรือสมัครสมาชิกใหม่`);
                }
                document.getElementById('resetPasswordModal').remove();
            }, 1500);
        });
    });

    // ปุ่มล็อกอินด้วย Social Media
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('btn-google') ? 'Google' : 'Facebook';
            alert(`กำลังเข้าสู่ระบบด้วย ${provider}... (ฟีเจอร์นี้ยังไม่เปิดให้บริการ)`);
        });
    });
});
