/**
 * Email utility using Resend (free tier: 3000 emails/month)
 * To use: npm install resend
 * Add RESEND_API_KEY to .env.local
 */

export async function sendOrderConfirmation(orderData) {
    try {
        // Check if Resend is configured
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not configured. Skipping email.');
            return { success: false, message: 'Email service not configured' };
        }

        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Aurabio <orders@aurabio.com>',
            to: [orderData.customer.email],
            subject: `Order Confirmation - ${orderData.orderNumber}`,
            html: generateOrderConfirmationHTML(orderData),
        });

        if (error) {
            console.error('Resend email error:', error);
            return { success: false, error };
        }

        console.log('Order confirmation email sent:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
}

function generateOrderConfirmationHTML(order) {
    const itemsHTML = order.items
        .map(
            (item) => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                ${item.name} (${item.variant === 'refill' ? 'Refill' : 'Full Vessel'})
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
                ${item.quantity}
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
                $${item.price.toFixed(2)}
            </td>
        </tr>
    `
        )
        .join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f0; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #2c2c2c; padding: 40px; text-align: center;">
                            <h1 style="color: #f5f5f0; margin: 0; font-size: 28px; letter-spacing: 2px;">AURABIO</h1>
                            <p style="color: #c9a959; margin: 10px 0 0 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Cellular Vitality. Isola Crafted.</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <h2 style="color: #2c2c2c; margin: 0 0 20px 0; font-size: 24px;">Thank You for Your Order</h2>
                            <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
                                Dear ${order.customer.name || 'Valued Customer'},
                            </p>
                            <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0;">
                                We've received your order and are preparing it with the utmost care. You'll receive a shipping confirmation email once your order is on its way.
                            </p>

                            <!-- Order Details -->
                            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                                <h3 style="color: #2c2c2c; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Order Details</h3>
                                <p style="color: #666; margin: 5px 0;"><strong>Order Number:</strong> ${order.orderNumber}</p>
                                <p style="color: #666; margin: 5px 0;"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            <!-- Items Table -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                                <thead>
                                    <tr style="background-color: #2c2c2c;">
                                        <th style="padding: 15px; text-align: left; color: #f5f5f0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Item</th>
                                        <th style="padding: 15px; text-align: center; color: #f5f5f0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Qty</th>
                                        <th style="padding: 15px; text-align: right; color: #f5f5f0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsHTML}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2" style="padding: 15px; text-align: right; font-weight: bold; border-top: 2px solid #2c2c2c;">Subtotal:</td>
                                        <td style="padding: 15px; text-align: right; border-top: 2px solid #2c2c2c;">$${order.subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="padding: 15px; text-align: right;">Shipping:</td>
                                        <td style="padding: 15px; text-align: right;">${order.shippingCost === 0 ? 'FREE' : '$' + order.shippingCost.toFixed(2)}</td>
                                    </tr>
                                    ${order.tax > 0 ? `
                                    <tr>
                                        <td colspan="2" style="padding: 15px; text-align: right;">Tax:</td>
                                        <td style="padding: 15px; text-align: right;">$${order.tax.toFixed(2)}</td>
                                    </tr>
                                    ` : ''}
                                    <tr>
                                        <td colspan="2" style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px; border-top: 2px solid #2c2c2c;">Total:</td>
                                        <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px; border-top: 2px solid #2c2c2c;">$${order.total.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>

                            <!-- Shipping Address -->
                            ${order.shippingAddress ? `
                            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                                <h3 style="color: #2c2c2c; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Shipping Address</h3>
                                <p style="color: #666; margin: 0; line-height: 1.6;">
                                    ${order.shippingAddress.line1}<br>
                                    ${order.shippingAddress.line2 ? order.shippingAddress.line2 + '<br>' : ''}
                                    ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br>
                                    ${order.shippingAddress.country}
                                </p>
                            </div>
                            ` : ''}

                            <p style="color: #666; line-height: 1.6; margin: 30px 0 0 0;">
                                If you have any questions about your order, please don't hesitate to contact us at <a href="mailto:support@aurabio.com" style="color: #c9a959;">support@aurabio.com</a>.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eee;">
                            <p style="color: #999; margin: 0; font-size: 12px; line-height: 1.6;">
                                © ${new Date().getFullYear()} Aurabio. All rights reserved.<br>
                                Cellular Vitality. Isola Crafted.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

// Helper function to send shipping confirmation
export async function sendShippingConfirmation(order, trackingInfo) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not configured. Skipping email.');
            return { success: false, message: 'Email service not configured' };
        }

        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Aurabio <orders@aurabio.com>',
            to: [order.customer.email],
            subject: `Your Order Has Shipped - ${order.orderNumber}`,
            html: `
                <h2>Your order is on its way!</h2>
                <p>Order Number: ${order.orderNumber}</p>
                <p>Tracking Number: ${trackingInfo.trackingNumber}</p>
                <p><a href="${trackingInfo.trackingUrl}">Track your package</a></p>
            `,
        });

        if (error) {
            console.error('Shipping email error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
}
