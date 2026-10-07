import uuid

class BillingAgent:
    """
    SaaS 크레딧 결제 및 차감 체계를 관리하는 에이전트.
    클라우드 API(Ollama 외부 릴레이, 고사양 Vision 모델 등) 사용 시 크레딧을 소모합니다.
    """
    def __init__(self):
        # PoC 레벨: 인메모리로 유저 크레딧 관리 (실제는 DB 연동)
        self.user_credits = {
            "default_user": 1000
        }

    def get_balance(self, user_id: str = "default_user") -> int:
        return self.user_credits.get(user_id, 0)

    def consume_credit(self, amount: int, user_id: str = "default_user", feature: str = "AI_Search") -> bool:
        """기능 사용 시 크레딧 차감. 잔여 크레딧이 부족하면 False 반환."""
        balance = self.get_balance(user_id)
        if balance >= amount:
            self.user_credits[user_id] -= amount
            print(f"[BillingAgent] {feature} 사용으로 {amount} 크레딧 차감됨. (잔여: {self.user_credits[user_id]})")
            return True
        else:
            print(f"[BillingAgent] 결제 필요: 잔여 크레딧이 부족합니다. (요청: {amount}, 잔여: {balance})")
            return False

    def recharge_credit(self, amount: int, user_id: str = "default_user", receipt_id: str = ""):
        """결제 완료(ex: Stripe/Toss 연동) 후 크레딧 충전"""
        if not receipt_id:
            receipt_id = str(uuid.uuid4())
        self.user_credits[user_id] = self.user_credits.get(user_id, 0) + amount
        print(f"[BillingAgent] {amount} 크레딧 충전 완료. (영수증: {receipt_id})")
        return self.user_credits[user_id]

if __name__ == "__main__":
    billing = BillingAgent()
    billing.consume_credit(150, feature="Advanced_PDF_Convert")
    billing.recharge_credit(5000)
