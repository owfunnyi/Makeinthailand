// register.js
document.addEventListener('DOMContentLoaded', function() {
    // การแสดง/ซ่อนรหัสผ่าน
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        toggleConfirmPassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });

    // การตรวจสอบความแข็งแรงของรหัสผ่าน
    const passwordStrength = document.querySelector('.password-strength');
    const passwordStrengthText = document.querySelector('.password-strength-text');
    const lengthCheck = document.getElementById('length-check');
    const uppercaseCheck = document.getElementById('uppercase-check');
    const lowercaseCheck = document.getElementById('lowercase-check');
    const numberCheck = document.getElementById('number-check');
    const specialCheck = document.getElementById('special-check');

    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        let strength = 0;
        let strengthText = '';
        let color = '';

        // ตรวจสอบเงื่อนไขต่างๆ
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        // อัปเดตรายการตรวจสอบ
        updateCheckItem(lengthCheck, hasLength);
        updateCheckItem(uppercaseCheck, hasUppercase);
        updateCheckItem(lowercaseCheck, hasLowercase);
        updateCheckItem(numberCheck, hasNumber);
        updateCheckItem(specialCheck, hasSpecial);

        // คำนวณความแข็งแรง
        if (hasLength) strength += 1;
        if (hasUppercase) strength += 1;
        if (hasLowercase) strength += 1;
        if (hasNumber) strength += 1;
        if (hasSpecial) strength += 1;

        // กำหนดสีและข้อความ
        switch (strength) {
            case 0:
                strengthText = '';
                color = '';
                break;
            case 1:
                strengthText = 'อ่อนมาก';
                color = '#ff4d4d';
                break;
            case 2:
                strengthText = 'อ่อน';
                color = '#ffa64d';
                break;
            case 3:
                strengthText = 'ปานกลาง';
                color = '#ffff4d';
                break;
            case 4:
                strengthText = 'แข็งแรง';
                color = '#4dff4d';
                break;
            case 5:
                strengthText = 'แข็งแรงมาก';
                color = '#4d4dff';
                break;
        }

        passwordStrength.style.backgroundColor = color;
        passwordStrength.style.width = (strength * 20) + '%';
        passwordStrengthText.textContent = strength > 0 ? 'ความแข็งแรงของรหัสผ่าน: ' + strengthText : '';
    });

    function updateCheckItem(element, isValid) {
        if (isValid) {
            element.classList.add('valid');
            element.querySelector('i').className = 'fas fa-check-circle';
            element.querySelector('i').style.color = '#4CAF50';
        } else {
            element.classList.remove('valid');
            element.querySelector('i').className = 'fas fa-circle';
            element.querySelector('i').style.color = '#ccc';
        }
    }

    // CSS successss modal
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

    // สไตล์ CSS ข้อความแจ้งเตือนข้อมูลซ้ำ
    if (!document.getElementById('duplicate-error-style')) {
        const duplicateErrorStyle = document.createElement('style');
        duplicateErrorStyle.id = 'duplicate-error-style';
        duplicateErrorStyle.textContent = `
            .error-message.duplicate {
                background-color: #ffebee;
                border-left: 3px solid #f44336;
                padding: 8px 12px;
                margin-top: 5px;
                border-radius: 3px;
                animation: shake 0.5s;
            }
    
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(duplicateErrorStyle);
    }

    // ฟังก์ชันสำหรับการเปรียบเทียบชื่อ-นามสกุล
    function normalizeFullName(name) {
        // ลบช่องว่างที่ไม่จำเป็น และแปลงเป็นตัวพิมพ์เล็กทั้งหมด
        return name.toLowerCase().trim()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s{2,}/g, " ");
    }

    // การจัดการฟอร์มสมัครสมาชิก
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // รีเซ็ตข้อความแสดงข้อผิดพลาด
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.style.display = 'none';
            element.classList.remove('duplicate');
        });
        
        // รีเซ็ตคลาส error ของช่องกรอกข้อมูล
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('error');
        });
        
        // รับค่าจากฟอร์ม
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        let isValid = true;
        
        // ตรวจสอบชื่อ-นามสกุล
        if (fullName.trim().length < 3) {
            document.getElementById('fullNameError').textContent = 'กรุณาระบุชื่อ-นามสกุลที่ถูกต้อง';
            document.getElementById('fullNameError').style.display = 'block';
            isValid = false;
        }
        
        // ตรวจสอบรูปแบบอีเมล
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'กรุณาใส่อีเมลให้ถูกต้อง';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        
        // ตรวจสอบเบอร์โทรศัพท์
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            document.getElementById('phoneError').textContent = 'กรุณาใส่เบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)';
            document.getElementById('phoneError').style.display = 'block';
            isValid = false;
        }
        
        // ตรวจสอบรหัสผ่าน
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            document.getElementById('passwordError').textContent = 'รหัสผ่านไม่ตรงตามข้อกำหนด';
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }
        
        // ตรวจสอบการยืนยันรหัสผ่าน
        if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'รหัสผ่านไม่ตรงกัน';
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        }
        
        // ตรวจสอบการยอมรับข้อกำหนด
        if (!agreeTerms) {
            alert('กรุณายอมรับข้อกำหนดและเงื่อนไขก่อนสมัครสมาชิก');
            isValid = false;
        }
        
        // ตรวจสอบข้อมูลซ้ำในระบบ
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // ตรวจสอบอีเมลซ้ำ
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            const emailError = document.getElementById('emailError');
            emailError.textContent = 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น';
            emailError.style.display = 'block';
            emailError.classList.add('duplicate');
            document.getElementById('email').classList.add('error');
            isValid = false;
        }

        // ตรวจสอบเบอร์โทรศัพท์ซ้ำ
        const phoneExists = users.some(user => user.phone === phone);
        if (phoneExists) {
            const phoneError = document.getElementById('phoneError');
            phoneError.textContent = 'เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว กรุณาใช้เบอร์อื่น';
            phoneError.style.display = 'block';
            phoneError.classList.add('duplicate');
            document.getElementById('phone').classList.add('error');
            isValid = false;
        }
        
        // ตรวจสอบชื่อ-นามสกุลซ้ำ (ไทยและอังกฤษ)
        const normalizedNewName = normalizeFullName(fullName);
        const fullNameExists = users.some(user => {
            const normalizedExistingName = normalizeFullName(user.fullName);
            return normalizedExistingName === normalizedNewName;
        });

        if (fullNameExists) {
            const fullNameError = document.getElementById('fullNameError');
            fullNameError.textContent = 'ชื่อ-นามสกุลนี้ถูกใช้งานแล้ว กรุณาใช้ชื่ออื่น';
            fullNameError.style.display = 'block';
            fullNameError.classList.add('duplicate');
            document.getElementById('fullName').classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // โหลด
            const button = document.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังดำเนินการ...';
            button.disabled = true;
            
            // สร้างข้อมูลผู้ใช้ใหม่
            const newUser = {
                fullName: fullName,
                email: email,
                phone: phone,
                password: password,
                registeredAt: new Date().toISOString()
            };
            
            // เพิ่มผู้ใช้ใหม่ลงในรายการผู้ใช้
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // จำลองการส่งข้อมูล
            setTimeout(() => {
                // แสดง success modal แทนการใช้ alert
                showSuccessModal(fullName);
            }, 1500);
        }
    });

    // ฟังก์ชันแสดง success modal
    function showSuccessModal(fullName) {
        // modal element
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'success-modal-overlay';
        
        modalOverlay.innerHTML = `
            <div class="success-modal">
                <div class="success-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h2 class="success-title">สมัครสมาชิกสำเร็จ!</h2>
                <p class="success-message">ยินดีต้อนรับ ${fullName} ที่เข้ามาเป็นครอบครัวเดียวกัน</p>
                <button class="success-button" id="loginButton">
                    <i class="fas fa-sign-in-alt"></i> เข้าสู่ระบบ
                </button>
            </div>
        `;
        
        // modal เข้าไปใน DOM
        document.body.appendChild(modalOverlay);
        
        // modal ด้วย animation
        setTimeout(() => {
            modalOverlay.classList.add('show');
        }, 10);
        
        // event listener สำหรับปุ่มเข้าสู่ระบบ
        document.getElementById('loginButton').addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
});
