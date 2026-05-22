const sendEmail = require("../utils/sendEmail");

exports.testEmail = async (req, res) => {
    try {

        await sendEmail(
            "sureshranwa989@gmail.com",
            "SMTP Testing",
            "SMTP is working successfully"
        );

        res.status(200).json({
            success: true,
            message: "Email sent successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error sending email",
            error: error.message,
        });

    }
};